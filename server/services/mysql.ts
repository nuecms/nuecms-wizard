import mysql from 'mysql2/promise';
import fs from 'fs/promises';
import path from 'path';
import { MysqlConfig } from '../types';
import wizardConfig from '../../wizard.config';
import { Importer } from '../utils/mysql-import';

/**
 * Connects to the MySQL server.
 */
export const connect = (config: MysqlConfig) => {
  const { host, port, username, password } = config;
  return mysql.createConnection({ host, port: Number(port), user: username, password });
}

/**
 * Checks the database connection and prepares the database.
 * @param config The database configuration.
 * @returns A promise that resolves if the database is ready, and rejects if there is an error.
*/
export async function checkDatabase(config) {
  try {
    const sql = await connect(config);
    console.log('Connected to MySQL server.');
    const [databases]: any = await sql.query(`SHOW DATABASES LIKE ?`, [config.database]);
    if (databases && databases.length === 0) {
      console.log('Database does not exist. Creating...');

      // character_set_connection utf8mb4_general_ci
      // await sql.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\``);
      await sql.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci`);
    }
    // const [tables]: any = await sql.query(`SHOW TABLES LIKE ?`, [`${config.prefix}%`]);
    // console.log('Tables:', tables);
    // if (tables.length > 0) {
    //   throw new Error('Database is not empty. Clear the database or use a different table prefix.');
    // }
    console.log('Database is ready.');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
}


/**
 * Validates the database connection and prepares the database.
 */
export async function validateDatabase(config: MysqlConfig) {
  let connection: mysql.Connection;
  const { database: name, prefix } = config;
  try {
    connection = await connect(config);

    console.log('Connected to MySQL server.');

    await connection.query("SET character_set_connection=utf8, character_set_results=utf8, character_set_client=binary");
    await connection.query("SET sql_mode=''");

    const [databases]: any = await connection.query(`SHOW DATABASES LIKE ?`, [name]);
    if (databases.length === 0) {
      console.log('Database does not exist. Creating...');
      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${name}\` DEFAULT CHARACTER SET utf8`);
    }

    const [verifiedDatabases]: any = await connection.query(`SHOW DATABASES LIKE ?`, [name]);
    if (verifiedDatabases.length === 0) {
      throw new Error('Database does not exist, and creation failed.');
    }

    await connection.query(`USE \`${name}\``);

    const [tables]: any = await connection.query(`SHOW TABLES LIKE ?`, [`${prefix}%`]);
    if (tables.length > 0) {
      throw new Error('Database is not empty. Clear the database or use a different table prefix.');
    }
    return { success: true };
  } catch (err) {
    console.error('Error:', err.message);
    return { success: false, error: err.message };
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

/**
 * Imports SQL data from a file into the database.
 */
export async function importSQLData(config: MysqlConfig) {
  const sqlFilePath = wizardConfig.sqlfile;
  try {

    const importer = new Importer({ host: config.host, user: config.username, password: config.password, database: config.database });
    importer.onProgress((progress) => {
      const percent = Math.floor(progress.bytes_processed / progress.total_bytes * 10000) / 100;
      console.log(`${percent}% Completed`);
    })
    importer.import(path.join(process.cwd(), sqlFilePath)).then(() => {
      console.log('SQL data imported successfully.');
    }).catch((err) => {
      throw err;
    })
  } catch (err) {
    console.error('Error importing SQL data:', err.message);
  } finally {
  }
}

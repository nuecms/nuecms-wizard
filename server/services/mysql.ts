import mysql from 'mysql2/promise';
import fs from 'fs/promises';
import { Config } from '../types';

/**
 * Connects to the MySQL server.
 */
export const connect = (config: Config) => {
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
export async function validateDatabase(config: Config) {
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
export async function importSQLData(config: Config, sqlFilePath) {
  let connection;
  try {
    // Read the SQL file
    const sqlContent = await fs.readFile(sqlFilePath, 'utf8');

    // Connect to the database
    connection = await connect(config);
    console.log('Connected to the database.');

    // Execute SQL queries from the file
    const queries = sqlContent.split(';').filter((query) => query.trim());
    for (const query of queries) {
      await connection.query(query.trim());
    }
    console.log('SQL data imported successfully.');
    return { success: true };
  } catch (err) {
    console.error('Error importing SQL data:', err.message);
    return { success: false, error: err.message };
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

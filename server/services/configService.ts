import fs from 'fs/promises';
import path from 'path';
import { Config, Configs } from '../types';
import wizardConfig from '../../wizard.config';

export async function saveConfigToJson(configs: Configs): Promise<void> {
  await fs.writeFile(path.join(process.cwd(), wizardConfig.configfile), JSON.stringify(configs, null, 2));
}

export async function replaceConfigVariables(configs: Configs): Promise<void> {
  Object.entries(wizardConfig.varfile).forEach(async ([file, outFile]) => {
    let content = await fs.readFile(path.join(process.cwd(), file), 'utf-8');
    // Replace MySQL variables
    content = content.replace(/MYSQL_HOST\s*=\s*['"].*?['"]/, `MYSQL_HOST = "${configs.mysql.host}"`);
    content = content.replace(/MYSQL_PORT\s*=\s*\d+/, `MYSQL_PORT = ${configs.mysql.port}`);
    content = content.replace(/MYSQL_USER\s*=\s*['"].*?['"]/, `MYSQL_USER = "${configs.mysql.username}"`);
    content = content.replace(/MYSQL_PASSWORD\s*=\s*['"].*?['"]/, `MYSQL_PASSWORD = "${configs.mysql.password}"`);
    content = content.replace(/MYSQL_DATABASE\s*=\s*['"].*?['"]/, `MYSQL_DATABASE = "${configs.mysql.database}"`);

    // Replace Redis variables
    content = content.replace(/REDIS_HOST\s*=\s*['"].*?['"]/, `REDIS_HOST = "${configs.redis.host}"`);
    content = content.replace(/REDIS_PORT\s*=\s*\d+/, `REDIS_PORT = ${configs.redis.port}`);
    content = content.replace(/REDIS_PASSWORD\s*=\s*['"].*?['"]/, `REDIS_PASSWORD = "${configs.redis.password}"`);
    await fs.writeFile(path.join(process.cwd(), outFile), content);
  })
}


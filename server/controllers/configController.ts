import { Request, Response } from 'express';
import { Configs } from '../types';
import { saveConfigToJson, replaceConfigVariables } from '../services/configService';
import { checkDatabase } from '../services/mysql';
import { checkRedisConnection } from '../services/redis';
import { systemOverview } from '../services/systemService';
import { makeSalt } from '../utils/salt-gen';

export async function saveConfig(req: Request, res: Response) {
  const configs: Configs = req.body;
  // Default configurations
  configs.upload = {
    storagePath: '/upload',
    maxSize: 1024 * 1024 * 10, // 10MB
    allowedTypes: ['image/jpeg', 'image/png'],
  }
  configs.cookie = {
    prefix: 'ns',
    domain: '',
    path: '/',
  }
  configs.password = {
    salt: makeSalt(8),
  }
  console.log('Received configuration:', configs);
  try {
    await checkDatabase(configs.mysql);
    await checkRedisConnection(configs.redis);
    await saveConfigToJson(configs);
    await replaceConfigVariables(configs);
    res.success({ msg: 'Configuration saved, connections tested, and database initialized successfully' });
  } catch (error) {
    res.fail({ msg: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
}

// system-overview
export async function getSystemOverview(req: Request, res: Response) {
  try {
    const systemInfo = await systemOverview();
    res.success({
      data: systemInfo
    });
  } catch (error) {
    res.fail({ msg: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
}


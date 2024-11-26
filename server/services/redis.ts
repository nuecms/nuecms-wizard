import net from 'net';
import { RedisConfig } from '../types';

export function checkRedisConnection(config: RedisConfig): Promise<void> {
  return new Promise((resolve, reject) => {
    const socket = net.createConnection({
      host: config.host,
      port: typeof config.port === 'string' ? parseInt(config.port, 10) : config.port,
    });

    const sendCommand = (command: string): Promise<string> =>
      new Promise((res, rej) => {
        socket.write(`${command}\r\n`);
        socket.once('data', (data) => res(data.toString().trim()));
        socket.once('error', (err) => rej(err));
      });

    socket.on('connect', async () => {
      try {
        if (config.password) {
          const authResponse = await sendCommand(`AUTH ${config.password}`);
          if (authResponse !== '+OK') {
            throw new Error(`Authentication failed: ${authResponse}`);
          }
        }
        const pingResponse = await sendCommand('PING');
        if (pingResponse === '+PONG') {
          resolve();
        } else {
          throw new Error(`Unexpected response: ${pingResponse}`);
        }
      } catch (error) {
        reject(error);
      } finally {
        socket.end();
      }
    });

    socket.on('error', (err) => reject(new Error(`Redis connection failed: ${err.message}`)));
    socket.on('timeout', () => {
      socket.destroy();
      reject(new Error('Redis connection timed out'));
    });

    socket.setTimeout(5000);
  });
}

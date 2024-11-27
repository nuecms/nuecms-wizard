import fs from 'fs/promises';
import path from 'path';
import { Configs } from '../types';
import wizardConfig from '../../wizard.config';

export async function saveConfigToJson(configs: Configs): Promise<void> {
  await fs.writeFile(path.join(process.cwd(), wizardConfig.configfile), JSON.stringify(configs, null, 2));
}


/**
 * Flattens a nested configuration object into a single-level object
 * with dot-separated keys.
 */
function flattenObject(obj: Record<string, any>, parentKey = '', sep = '.'): Record<string, any> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const newKey = parentKey ? `${parentKey}${sep}${key}` : key;
    if (typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(acc, flattenObject(value, newKey, sep));
    } else {
      acc[newKey] = value;
    }
    return acc;
  }, {} as Record<string, any>);
}

export async function replaceConfigVariables(configs: Configs): Promise<void> {
  try {
    const flatConfigs = flattenObject(configs);

    for (const [file, outFile] of Object.entries(wizardConfig.varfile)) {
      const filePath = path.join(process.cwd(), file);
      let content = await fs.readFile(filePath, 'utf-8');

      // Replace placeholders
      for (const [key, value] of Object.entries(flatConfigs)) {
        let replacement;

        if (Array.isArray(value)) {
          // Format arrays as JavaScript arrays
          replacement = `[${value.map((v) => (typeof v === 'string' ? `'${v}'` : v)).join(', ')}]`;
        } else if (typeof value === 'string') {
          // Add quotes around strings to maintain valid JavaScript
          replacement = `'${value}'`;
        } else {
          // Use the value directly for numbers, booleans, etc.
          replacement = value;
        }

        // Replace placeholders in the content
        const regex = new RegExp(`\\{${key}\\}`, 'g');
        content = content.replace(regex, replacement);
      }

      const outFilePath = path.join(process.cwd(), outFile);
      await fs.writeFile(outFilePath, content);
      console.log(`Variables replaced and saved to ${outFilePath}`);
    }
  } catch (error) {
    console.error('Error replacing config variables:', error);
  }
}

import os from "os";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import wizardConfig from "../../wizard.config";

// Function to check if a directory is writable
function isDirectoryWritable(directoryPath) {
  try {
    fs.accessSync(directoryPath, fs.constants.W_OK); // Check write access
    return true; // Directory is writable
  } catch (err) {
    return false; // Directory is not writable
  }
}


export const openUrl = (url: string) => {
  let command;
  // Check the operating system and choose the appropriate command
  if (process.platform === 'win32') {
    command = `start ${url}`;
  } else if (process.platform === 'darwin') {
    command = `open ${url}`;
  } else if (process.platform === 'linux') {
    command = `xdg-open ${url}`;
  }
  try {
    // Execute the command
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error opening URL: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`URL opened successfully: ${stdout}`);
    });
  } catch (error) {
    throw error;
  }
};

// Build system overview object
export async function systemOverview() {
  try {
    const systemOverview = {
      serverInfo: { // Information about the operating system and host
        operatingSystem: `${os.type()} ${os.release()} ${os.arch()}`, // OS type, version, and architecture
        hostName: os.hostname(), // Hostname of the server
        systemUptime: `${(os.uptime() / 3600).toFixed(2)} hours`, // System uptime in hours
      },
      webServerEnvironment: { // Details about the web server and environment
        serverType: "Node.js", // Type of server
        nodeVersion: process.version, // Current Node.js version
        workingDirectory: process.cwd(), // Current working directory
        execPath: process.execPath, // Path to the Node.js executable
      },
      hardwareInfo: { // Hardware-related information
        cpuCoreCount: os.cpus().length, // Number of CPU cores
        cpuModel: os.cpus()[0].model, // CPU model name
        totalMemory: `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, // Total system memory
        freeMemory: `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`, // Available free memory
      },
      environmentVariables: { // Details about environment variables
        environmentVariableCount: Object.keys(process.env).length, // Total number of environment variables
        nodeEnv: process.env.NODE_ENV || "Not set", // NODE_ENV value (if set)
      },
      directoryPermissions: { // Information about directory write permissions
        rootDirectoryWritable: isDirectoryWritable(process.cwd()), // Check if root directory is writable
        dataDirectoryWritable: isDirectoryWritable(path.join(process.cwd(), 'data')), // Check if 'data' directory is writable
      }
    } as any;
    // Fetch MySQL and Redis versions
    // const mysqlVersion = await getMySQLVersion();
    // const redisVersion = await getRedisVersion();

    // // Add MySQL and Redis versions to the overview
    // systemOverview.databaseInfo = {
    //   mysqlVersion, // MySQL version
    //   redisVersion, // Redis version
    // };


    return systemOverview;
  } catch (error) {
    throw error;
  }
}

// detect /data/install.lock
export async function isInstallLocked() {
  try {
    const lockFilePath = path.join(process.cwd(), wizardConfig.lockfile);
    return fs.existsSync(lockFilePath);
  } catch (error) {
    throw error;
  }
}

// create /data/install.lock
export async function lockInstall() {
  try {
    const lockFilePath = path.join(process.cwd(), wizardConfig.lockfile);
    fs.writeFileSync(lockFilePath, '');
  } catch (error) {
    throw error;
  }
}



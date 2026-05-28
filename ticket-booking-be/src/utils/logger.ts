import fs from 'fs';
import path from 'path';

const LOG_DIR = path.resolve(__dirname, '../../logs');

// Ensure logs directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

function getTimestamp(): string {
  return new Date().toISOString();
}

function writeToFile(level: string, message: string): void {
  const date = new Date().toISOString().split('T')[0];
  const logFile = path.join(LOG_DIR, `${date}.log`);
  const logLine = `[${getTimestamp()}] [${level.toUpperCase()}] ${message}\n`;

  fs.appendFileSync(logFile, logLine, 'utf-8');
}

export const logger = {
  info(message: string): void {
    const formatted = `[${getTimestamp()}] [INFO] ${message}`;
    console.log(formatted);
    writeToFile('INFO', message);
  },

  warn(message: string): void {
    const formatted = `[${getTimestamp()}] [WARN] ${message}`;
    console.warn(formatted);
    writeToFile('WARN', message);
  },

  error(message: string): void {
    const formatted = `[${getTimestamp()}] [ERROR] ${message}`;
    console.error(formatted);
    writeToFile('ERROR', message);
  },

  debug(message: string): void {
    const formatted = `[${getTimestamp()}] [DEBUG] ${message}`;
    console.debug(formatted);
    writeToFile('DEBUG', message);
  },
};

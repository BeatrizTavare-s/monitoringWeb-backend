import cron from 'node-cron';
import dotenv from 'dotenv';
dotenv.config();

export function cronSchedule(cronExpression: string, callback: () => void) {
  const expression = process.env.CRON_EXPRESSION || cronExpression
  cron.schedule(expression, callback);
}

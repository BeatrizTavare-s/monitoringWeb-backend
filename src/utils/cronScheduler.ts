import cron from 'node-cron';

export function cronSchedule(cronExpression: string, callback: () => void) {
  cron.schedule(cronExpression, callback);
}

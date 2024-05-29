import { describe, expect, it, vi } from 'vitest';
import ScheduleAvailabilityCheck from '../../src/services/scheduleAvailabilityCheckService';
import { cronSchedule } from '../../src/utils/cronScheduler';
import { checkPort } from '../../src/utils/checkPortUtil';

vi.mock('../../src/utils/checkPortUtil', () => ({
  checkPort: vi.fn().mockResolvedValue({ status: 'open', responseTimeMs: 100 }),
}));

vi.mock('../../src/utils/cronScheduler', async () => ({
    cronSchedule: vi.fn().mockImplementation((cronExpression: string, callback: () => void) => {
      setInterval(callback, 1000); 
  })
}))

describe('ScheduleAvailabilityCheck', () => {
  it('should start monitoring', async () => {
    const scheduleAvailabilityCheck = new ScheduleAvailabilityCheck();
    scheduleAvailabilityCheck.startMonitoring();

    await new Promise(resolve => setTimeout(resolve, 2000));
    expect(checkPort).toHaveBeenCalled();
    expect(cronSchedule).toHaveBeenCalledTimes(1);
  });
});
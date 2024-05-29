import { describe, expect, it } from 'vitest';
import { MonitoringHistoryService } from '../../src/services/monitoringHistoryService';
import { MonitoringHistoryDataRequest, MonitoringHistoryRepositoryInterface } from '../../src/interfaces/monitoringHistoryRepositoryInterface';

class MockMonitoringHistoryRepository implements MonitoringHistoryRepositoryInterface {
    private histories: any[];

    constructor() {
        this.histories = [{
            id: "6656b128a0db763eba4d9e42",
            site: {
                id: "6656b11ea0db763eba4d9e3f",
                url: "www.google.com",
                port: 8080
            },
            status: "closed",
            responseTimeMs: 40
        },
        {
            id: "2256b128a0db763eba4d9e42",
            site: {
                id: "6656b11ea0db763eba4d9e3f",
                url: "www.google.com",
                port: 80
            },
            status: "open",
            responseTimeMs: 40
        },
    ];
    }

    async create(data: MonitoringHistoryDataRequest) {
        const newHistory = {
            id: "5556b128a0db763eba4d9e42",
            ...data,
        };
        this.histories.push({...newHistory, site: {
            id: "2656b11ea0db763eba4d9e3f",
            url: "www.github.com",
            port: 80
        }});
        return
    }

    async findAll() {
        return this.histories || [];
    }
}

const monitoringHistoryService = new MonitoringHistoryService(new MockMonitoringHistoryRepository());

describe('MonitoringHistoryService', () => {
    it('should return all monitoring histories', async () => {
        const mockHistories = [
            {
                id: "6656b128a0db763eba4d9e42",
                site: {
                    id: "6656b11ea0db763eba4d9e3f",
                    url: "www.google.com",
                    port: 8080
                },
                status: "closed",
                responseTimeMs: 40
            },
            {
                id: "2256b128a0db763eba4d9e42",
                site: {
                    id: "6656b11ea0db763eba4d9e3f",
                    url: "www.google.com",
                    port: 80
                },
                status: "open",
                responseTimeMs: 40
            },
        ];
      
        const result = await monitoringHistoryService.getAllHistories();
        expect(result).toEqual(mockHistories);
    });

    it('should create a new monitoring history', async () => {
        const newHistoryData = {
            responseTimeMs: 40,
            site: "2656b11ea0db763eba4d9e3f",
            status: "open"
        };

        const historyCreated = {
            id: "5556b128a0db763eba4d9e42",
            site: {
                id: "2656b11ea0db763eba4d9e3f",
                url: "www.github.com",
                port: 80
            },
            status: "open",
            responseTimeMs: 40
        };

        await monitoringHistoryService.createHistory(newHistoryData);
        const histories = await monitoringHistoryService.getAllHistories();
        expect(histories).toContainEqual(historyCreated);
    });
});



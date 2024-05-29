export type MonitoringHistoryDataRequest = {
    site: string,
    responseTimeMs: number,
    status: string
}

export type MonitoringHistoryDataResponse = {
    id: string,
    site: {
        id: string
        port: number;
        url: string;
    }
    status: string
}

export interface MonitoringHistoryRepositoryInterface {
    create(data: MonitoringHistoryDataRequest): Promise<void>;
    findAll(): Promise<MonitoringHistoryDataResponse[]>;
}
import { MonitoringHistoryDataRequest, MonitoringHistoryRepositoryInterface } from "../interfaces/monitoringHistoryRepositoryInterface";

export class MonitoringHistoryService {
    private monitoringHistoryRepository: MonitoringHistoryRepositoryInterface;

    constructor(monitoringHistoryRepository: MonitoringHistoryRepositoryInterface) {
        this.monitoringHistoryRepository = monitoringHistoryRepository;
    }

    async createHistory(data: MonitoringHistoryDataRequest) {
        return this.monitoringHistoryRepository.create(data);
    }
    async getAllHistories() {
        return this.monitoringHistoryRepository.findAll();
    }
}
import { MonitoringHistoryRepositoryInterface } from "../interfaces/monitoringHistoryRepositoryInterface";
import { MonitoringHistoryRepository } from "../repositories/monitoringHistoryRepository";
import { MonitoringHistoryService } from "../services/monitoringHistoryService";

class MonitoringHistoryController {
    private monitoringHistoryService: MonitoringHistoryService;
    private  monitoringHistoryRepository:  MonitoringHistoryRepositoryInterface;

    constructor() {
        this.monitoringHistoryRepository = new MonitoringHistoryRepository();
        this.monitoringHistoryService = new MonitoringHistoryService(this.monitoringHistoryRepository);
    }

    async get(req: any, res: any) {
        const historiesMonitor = await this.monitoringHistoryService.getAllHistories();
        res.send(historiesMonitor)
    }
}

export default new MonitoringHistoryController();
import { MonitoringHistoryDataRequest, MonitoringHistoryRepositoryInterface } from "../interfaces/monitoringHistoryRepositoryInterface";
import MonitoringHistory from "../model/MonitoringHistory"

export class MonitoringHistoryRepository implements MonitoringHistoryRepositoryInterface {

    async create(data: MonitoringHistoryDataRequest) {
        await MonitoringHistory.create(data)
        return
    }

    async findAll() {
        const monitoringHistories = await MonitoringHistory.find({}).populate({
            path: "site",
            select: "_id url port",
        });
        const mappedMonitoringHistories = monitoringHistories.map(function (monitoringHistory) {
            const siteObj = monitoringHistory.site as unknown as { id: string, url: string, port: number };
            return {
                id: monitoringHistory._id.toString(),
                site: {
                    id: siteObj.id,
                    url: siteObj.url,
                    port: siteObj.port,
                },
                status: monitoringHistory.status,
                responseTimeMs: monitoringHistory.responseTimeMs
            };
        });
        return mappedMonitoringHistories || [];
    }

    async deleteManyBySiteId(siteId: string) {
        await MonitoringHistory.deleteMany({ site: siteId });
    }
}
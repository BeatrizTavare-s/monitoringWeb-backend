import Site from "../model/Site"
import { MonitoringHistoryRepository } from "./monitoringHistoryRepository";
import { SiteDataRequest, SiteDataResponse, SiteRepositoryInterface } from '../interfaces/siteRepositoryInterface';


export class SiteRepository implements SiteRepositoryInterface {
    private monitoringHistoryRepository: MonitoringHistoryRepository;

    constructor() {
        this.monitoringHistoryRepository = new MonitoringHistoryRepository();
    }

    async create(data: SiteDataRequest) {
        const newSite = await Site.create(data)
        const responseNewSite = {
            id: newSite._id.toString(),
            port: newSite.port,
            url: newSite.url,
            createdAt: newSite.createdAt,
            updatedAt: newSite.updatedAt,
        }
        return responseNewSite
    }
    async findAll(): Promise<SiteDataResponse[] | []> {
        const sites = await Site.find({}, { id: 1, port: 1, url: 1, createdAt: 1, updatedAt: 1 });
        const mappedSites = sites.map(site => ({
            id: site._id.toString(),
            port: site.port,
            url: site.url,
            createdAt: site.createdAt,
            updatedAt: site.updatedAt,
        }));
        return mappedSites || [];
    }
    async findById(id: string) {
        const site = await Site.findById(id)
        if (!site) return null
        const responseSite = {
            id,
            port: site.port,
            url: site.url,
            createdAt: site.createdAt,
            updatedAt: site.updatedAt,
        }
        return responseSite
    }
    async upload(id: string, data: SiteDataRequest) {
        await Site.findByIdAndUpdate(id, {
            port: data.port,
            url: data.url,
            updatedAt: Date.now()
        })
    }
    async delete(id: string) {
        await this.monitoringHistoryRepository.deleteManyBySiteId(id)
        await Site.findByIdAndDelete(id);
    }
}
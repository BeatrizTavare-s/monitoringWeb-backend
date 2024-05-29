import { SiteDataRequest, SiteRepositoryInterface } from '../interfaces/siteRepositoryInterface';

export class SiteService {
    private siteRepository: SiteRepositoryInterface;
    constructor(siteRepository: SiteRepositoryInterface) {
        this.siteRepository = siteRepository;
    }

    async getAllSites() {
        return this.siteRepository.findAll();
    }

    async getSiteById(id:string) {
        return this.siteRepository.findById(id);
    }

    async post(data: SiteDataRequest) {
        return this.siteRepository.create(data);
    }

    async put(id: string, data: SiteDataRequest) {
        return this.siteRepository.upload(id, data);
    }

    async delete(id: string) {
        return this.siteRepository.delete(id);
    }

}
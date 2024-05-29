import { describe, expect, it } from 'vitest'
import { SiteService } from '../../src/services/siteService';
import { SiteDataRequest, SiteRepositoryInterface } from '../../src/interfaces/siteRepositoryInterface';


class MockSiteRepository implements SiteRepositoryInterface {
    private sites: any[];
    constructor() {
        this.sites = [
            {
                id: "7756b11ea0db763eba4d9e3e",
                port: 80,
                url: "www.google.com",
                createdAt: "2024-05-29T04:38:03.700Z",
                updatedAt: "2024-05-29T04:38:03.700Z"
            },
            {
                id: "6656b11ea0db763eba4d9e3f",
                port: 80,
                url: "www.github.com",
                createdAt: "2024-05-29T04:38:03.700Z",
                updatedAt: "2024-05-29T04:38:03.700Z"
            },
            {
                id: "6656b15df2dbcdbef6897640",
                port: 80,
                url: "www.youtube.com",
                createdAt: "2024-05-29T04:38:03.700Z",
                updatedAt: "2024-05-29T04:38:03.700Z"
            },
            {    
                id: "to-delete-6b15dfdbef6890",
                port: 80,
                url: "www.site-to-delete.com",
                createdAt: "2024-05-29T04:38:03.700Z",
                updatedAt: "2024-05-29T04:38:03.700Z"
            },
        ];
    }

    async findAll() {
        return this.sites || [];
    }

    async findById(id: string) {
        return this.sites.find(site => site.id === id) || null;
    }
    async create(data: SiteDataRequest) {
        const newSite = {
            id: "2156b15df2dbcdbef6897621",
            port: data.port,
            url: data.url,
            createdAt: new Date("2024-05-29T04:38:03.700Z"),
            updatedAt: new Date("2024-05-29T04:38:03.700Z")
        };

        this.sites.push(newSite);
        return newSite;
    }
    async upload(id: string, data: SiteDataRequest) {
        const updatedSiteIndex = this.sites.findIndex(site => site.id === id);
        if (updatedSiteIndex !== -1) {
            this.sites[updatedSiteIndex] = {
                ...this.sites[updatedSiteIndex],
                ...data,
                updatedAt: new Date().toISOString()
            };
            return this.sites[updatedSiteIndex];
        }
        return null;
    }
    async delete(id: string) {
        const deletedSiteIndex = this.sites.findIndex(site => site.id === id);
        if (deletedSiteIndex !== -1) {
            const deletedSite = this.sites.splice(deletedSiteIndex, 1)[0];
            return deletedSite;
        }
        return null;
    }

}
const siteService = new SiteService(new MockSiteRepository());

describe('SiteService', () => {
    it('should return all sites', async () => {
        const result = await siteService.getAllSites();
        expect(result).toEqual([
            {
                id: "7756b11ea0db763eba4d9e3e",
                port: 80,
                url: "www.google.com",
                createdAt: "2024-05-29T04:38:03.700Z",
                updatedAt: "2024-05-29T04:38:03.700Z"
            },
            {
                id: "6656b11ea0db763eba4d9e3f",
                port: 80,
                url: "www.github.com",
                createdAt: "2024-05-29T04:38:03.700Z",
                updatedAt: "2024-05-29T04:38:03.700Z"
            },
            {
                id: "6656b15df2dbcdbef6897640",
                port: 80,
                url: "www.youtube.com",
                createdAt: "2024-05-29T04:38:03.700Z",
                updatedAt: "2024-05-29T04:38:03.700Z"
            },
            {    
                id: "to-delete-6b15dfdbef6890",
                port: 80,
                url: "www.site-to-delete.com",
                createdAt: "2024-05-29T04:38:03.700Z",
                updatedAt: "2024-05-29T04:38:03.700Z"
            },
        ]);
    })

    it('should return one site by id', async () => {
        const result = await siteService.getSiteById("7756b11ea0db763eba4d9e3e");
        expect(result).toEqual({
            id: "7756b11ea0db763eba4d9e3e",
            port: 80,
            url: "www.google.com",
            createdAt: "2024-05-29T04:38:03.700Z",
            updatedAt: "2024-05-29T04:38:03.700Z"
        });
    })

    it('should return null for non-existing site id', async () => {
        const result = await siteService.getSiteById("non-existing-id");
        expect(result).toBeNull();
    });

    it('should create a new site', async () => {
        const newSiteData = {
            port: 80,
            url: "www.spotify.com"
        };

        const createdSite = await siteService.post(newSiteData);
        expect(createdSite).toEqual({
            id: "2156b15df2dbcdbef6897621",
            port: 80,
            url: "www.spotify.com",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        });

        const sites = await siteService.getAllSites();
        expect(sites).toContainEqual(createdSite);
    });

    it('should update an existing site', async () => {
        const updatedSiteData = {
            port: 8080,
            url: "www.example.com"
        };

        const updatedSite = await siteService.put("7756b11ea0db763eba4d9e3e", updatedSiteData);
        expect(updatedSite).toEqual({
            id: "7756b11ea0db763eba4d9e3e",
            port: 8080,
            url: "www.example.com",
            createdAt: expect.any(String),
            updatedAt: expect.any(String) 
        });

        const sites = await siteService.getAllSites();
        expect(sites).toContainEqual(updatedSite);
    });

    it('should return null for non-existing site id during upload', async () => {
        const updatedSiteData = {
            port: 8080,
            url: "www.example.com"
        };

        const updatedSite = await siteService.put("non-existing-id", updatedSiteData);
        expect(updatedSite).toBeNull();
    });

    it('should delete an existing site', async () => {
        const deletedSiteId = "to-delete-6b15dfdbef6890";

        const deletedSite = await siteService.delete(deletedSiteId);
        expect(deletedSite).toEqual({
            id: "to-delete-6b15dfdbef6890",
            port: 80,
            url: "www.site-to-delete.com",
            createdAt: expect.any(String),
            updatedAt: expect.any(String) 
        });

        const sites = await siteService.getAllSites();
        expect(sites).not.toContainEqual(deletedSite);
    });

    it('should return null for non-existing site id during delete', async () => {
        const deletedSiteId = "non-existing-id";

        const deletedSite = await siteService.delete(deletedSiteId);
        expect(deletedSite).toBeNull();
    });
})
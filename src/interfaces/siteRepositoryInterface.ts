export type SiteDataRequest = {
    port: number;
    url: string;
}

export type SiteDataResponse = {
    id: string,
    port: number;
    url: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface SiteRepositoryInterface {
    findAll(): Promise<SiteDataResponse[]>;
    findById(id: string): Promise<SiteDataResponse | null>;
    create(data: SiteDataRequest): Promise<SiteDataResponse>;
    upload(id: string, data: SiteDataRequest): Promise<void>;
    delete(id: string): Promise<void>;
}
import { z } from "zod";
import { SiteService } from "../services/siteService";
import { Request, Response } from 'express';
import { SiteRepositoryInterface } from "../interfaces/siteRepositoryInterface";
import { SiteRepository } from "../repositories/siteRepository";

const siteSchema = z.object({
    port: z.number(),
    url: z.string()
});

class SiteController {
    private siteService: SiteService;
    private siteRepository: SiteRepositoryInterface;
    constructor() {
        this.siteRepository = new SiteRepository();
        this.siteService = new SiteService(this.siteRepository);
    }

    async get(req: Request, res: Response) {
        const id = req.query.id as string;
        if (id) {
            const site = await this.siteService.getSiteById(id)
            if (site) {
                res.send(site)
                return
            }
            res.status(404).send("Site not found")
            return
        }
        const listSites = await this.siteService.getAllSites()
        res.send(listSites)
    }

    async post(req: Request, res: Response) {
        try {
            const { error } = siteSchema.safeParse(req.body)
            if (error) {
                res.status(400).send(error.message)
                return
            }
            const newSite = await this.siteService.post(req.body)
            res.status(200).send(newSite)
        } catch (err: any) {
            res.status(500).send('Internal Server Error');
        }
    }

    async put(req: Request, res: Response) {
        const { error } = siteSchema.safeParse(req.body)
        if (error) {
            res.status(400).send(error.message)
            return
        }
        try {
            const id = req.query.id as string;;
            if (id) {
                await this.siteService.put(id, {
                    port: req.body.port,
                    url: req.body.url,
                })
            }
            res.status(200).send("Updated successfully")
        } catch (err: any) {
            res.status(500).send('Internal Server Error');
        }
    }


    async delete(req: Request, res: Response) {
        try {
            const id = req.query.id as string;
            if (id) {
                await this.siteService.delete(id);
            }
            res.status(200).send("Delete successfully")
        }
        catch (err: any) {
            res.status(500).send('Internal Server Error');
        }
    }
}

export default new SiteController();
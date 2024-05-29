import { MonitoringHistoryService } from './monitoringHistoryService';
import { SiteService } from './siteService';
import { SiteRepository } from '../repositories/siteRepository';
import { SiteRepositoryInterface } from '../interfaces/siteRepositoryInterface';
import { MonitoringHistoryRepository } from '../repositories/monitoringHistoryRepository';
import { checkPort } from '../utils/checkPortUtil';
import { cronSchedule } from '../utils/cronScheduler';

export default class ScheduleAvailabilityCheck {
  private monitoringHistoryService: MonitoringHistoryService;
  private siteService: SiteService;
  private siteRepository: SiteRepositoryInterface;
  private monitoringHistoryRepository: MonitoringHistoryRepository;

  constructor() {
    this.monitoringHistoryRepository = new MonitoringHistoryRepository();
    this.monitoringHistoryService = new MonitoringHistoryService( this.monitoringHistoryRepository);
    this.siteRepository = new SiteRepository();
    this.siteService = new SiteService(this.siteRepository);
  }


  startMonitoring() {
    try {
      cronSchedule('*/1 * * * *', async () => {
        const sites = await this.siteService.getAllSites();

        if (!sites || sites.length === 0) {
          console.log('No sites found');
          return;
        }

        for (const site of sites) {
          const historySite = {
            site: '',
            responseTimeMs: 0,
            status: ''
          };

          const resultCheckPort = await checkPort(site.url, site.port);
          const isValidResult = resultCheckPort && resultCheckPort.responseTimeMs !== undefined && resultCheckPort.status !== undefined;
          
          if(!isValidResult) return;

          historySite.site = site.id;
          historySite.responseTimeMs = resultCheckPort.responseTimeMs;
          historySite.status = resultCheckPort.status;
          this.monitoringHistoryService.createHistory(historySite);
          console.log(`${site.url}: Status ${historySite.status}, Tempo de Resposta ${historySite.responseTimeMs}ms`);
        }
      });
    } catch (e) {
      console.log(e)
    }
  }
}
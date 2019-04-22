import { filter } from 'bluebird';

import { Cache } from '../../services/cache';
import { logger } from '../../services/logger';
import { FailoverService } from './service';

export class FailoverGroup {
  private services: FailoverService[];
  private cache: Cache;
  constructor(serviceClasses: any, cache: Cache) {
    this.cache = cache;
    this.buildServices(serviceClasses);
  }
  public getAllServices() {
    return this.services;
  }
  public async getAvailableServices() {
    return filter(this.services, (service: FailoverService) => {
      return service.isAvailable();
    });
  }
  public async actionService(actionFn: Function) {
    const services = await this.getAvailableServices();
    logger.info(`Available Services ${services.length}`);
    for (const service of services) {
      try {
        const res = await actionFn(service);
        if (res.success) {
          return res;
        }
        // Assume that 400 is validation error - Everything higher is a problem with our connection or the service itself
        if (res.status > 400) {
          service.setServiceAvailability(false);
        }
        // We don't need to await this as it's not important to the user
        service.setServiceAvailability(false);
        // return undefined
      } catch (error) {
        logger.error(`actionService(): ${error}`);
        // We don't need to await this as it's not important to the user
        service.setServiceAvailability(false);
      }
    }
  }
  private buildServices(serviceClasses: any) {
    this.services = serviceClasses.map((serviceClass: any) => new FailoverService(serviceClass, this.cache));
  }
}

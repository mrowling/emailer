import { Cache } from '../../services/cache';

export class FailoverService {
  private childClass: any;
  private errorCache: Cache;
  constructor(childClass: any, cache: Cache) {
    this.errorCache = cache;
    this.childClass = childClass;
  }
  public getInstance(options: any) {
    return new this.childClass(options);
  }
  public setServiceAvailability(isAvailable: boolean) {
    const isUnavailable = !isAvailable;
    return this.errorCache.set(this.childClass.name, isUnavailable);
  }
  public async isAvailable() {
    const value = await this.errorCache.get(this.childClass.name);
    return !value;
  }
}

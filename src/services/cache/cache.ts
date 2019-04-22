import { promisifyAll } from 'bluebird';
import * as nodeCache from 'node-cache';

import { logger } from '../logger';

export interface IPromisifedNodeCache extends nodeCache {
  [x: string]: any;
}

type Key = string | number;

promisifyAll(nodeCache.prototype);

export class Cache {
  private cache: IPromisifedNodeCache;
  constructor() {
    const options = {
      stdTTL: 300,
      checkperiod: 30
    };
    logger.info('Starting Cache');
    this.cache = new nodeCache(options);
  }
  public get(key: Key) {
    return this.cache.getAsync(key);
  }
  public set<T>(key: Key, value: T, ttl?: number | string) {
    return this.cache.setAsync(key, value, ttl);
  }
}

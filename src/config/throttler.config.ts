import { ThrottlerModuleOptions } from '@nestjs/throttler';

export const throttlerConfig: ThrottlerModuleOptions = [
  {
    name: 'short',
    ttl: 1000,
    limit: 10,
  },
  {
    name: 'medium',
    ttl: 10000,
    limit: 50,
  },
  {
    name: 'long',
    ttl: 60000,
    limit: 200,
  },
  {
    name: 'strict',
    ttl: 60000,
    limit: 10,
  },
];

export const throttlerLimits = {
  health: { short: { limit: 20, ttl: 1000 } },
  appInfo: { short: { limit: 5, ttl: 1000 } },
  plans: { short: { limit: 15, ttl: 1000 } },
  
  read: { short: { limit: 20, ttl: 1000 } },
  
  create: { short: { limit: 5, ttl: 1000 } },
  
  update: { short: { limit: 10, ttl: 1000 } },
  
  delete: { short: { limit: 3, ttl: 1000 } },
  
  sensitive: { short: { limit: 2, ttl: 1000 } },
};

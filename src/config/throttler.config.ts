import { ThrottlerModuleOptions } from '@nestjs/throttler';

export const throttlerConfig: ThrottlerModuleOptions = [
  {
    name: 'short',
    ttl: 1000,
    limit: 50, // Aumentado de 10 para 50
  },
  {
    name: 'medium',
    ttl: 10000,
    limit: 200, // Aumentado de 50 para 200
  },
  {
    name: 'long',
    ttl: 60000,
    limit: 1000, // Aumentado de 200 para 1000
  },
  {
    name: 'strict',
    ttl: 60000,
    limit: 20, // Aumentado de 10 para 20
  },
];

export const throttlerLimits = {
  health: { short: { limit: 20, ttl: 1000 } },
  appInfo: { short: { limit: 5, ttl: 1000 } },
  plans: { short: { limit: 15, ttl: 1000 } },
  
  read: { short: { limit: 100, ttl: 1000 } }, // Aumentado para 100 requests por segundo
  
  create: { short: { limit: 5, ttl: 1000 } },
  
  update: { short: { limit: 10, ttl: 1000 } },
  
  delete: { short: { limit: 3, ttl: 1000 } },
  
  sensitive: { short: { limit: 2, ttl: 1000 } },
  
  properties: { short: { limit: 200, ttl: 1000 } }, // Configuração específica para propriedades
};

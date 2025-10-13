import { Test, TestingModule } from '@nestjs/testing';
import { ClimateService } from './climate.service';

describe('ClimateService', () => {
  let service: ClimateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClimateService],
    }).compile();

    service = module.get<ClimateService>(ClimateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch climate data for valid coordinates', async () => {
    // São Paulo, SP coordinates
    const lat = -23.5505;
    const lon = -46.6333;

    const result = await service.getClimateData(lat, lon);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(12); // 12 months

    // Check if each month has expected data
    result.forEach((climate, index) => {
      expect(climate.month).toBeDefined();
      expect(typeof climate.month).toBe('string');
      expect(climate.temperature).toBeDefined();
      expect(climate.precipitation).toBeDefined();
    });
  }, 10000); // 10 second timeout for HTTP request
});

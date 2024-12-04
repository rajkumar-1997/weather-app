import { Test, TestingModule } from '@nestjs/testing';
import { WeatherReportController } from './weather-report.controller';

describe('WeatherReportController', () => {
  let controller: WeatherReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherReportController],
    }).compile();

    controller = module.get<WeatherReportController>(WeatherReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

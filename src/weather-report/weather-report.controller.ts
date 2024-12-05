import { Controller, Get, Query } from '@nestjs/common';
import { WeatherReportService } from './weather-report.service';
import { Throttle } from '@nestjs/throttler';
@Controller('weather-report')
export class WeatherReportController {
  constructor(private readonly weatherReportService: WeatherReportService) {}

  @Get('/weather-by-ip')
  @Throttle({ default: { limit: 3, ttl: 5 * 60 * 1000 } })
  async getWeatherByIp(@Query('ip') ip: string) {
    const res = await this.weatherReportService.getWeatherByIp(ip);
    return res;
  }
}

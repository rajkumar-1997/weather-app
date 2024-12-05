import { Controller, Get, Query } from '@nestjs/common';
import { WeatherReportService } from './weather-report.service';
import { Throttle } from '@nestjs/throttler';
@Controller('weather-report')
export class WeatherReportController {
  constructor(private readonly weatherReportService: WeatherReportService) {}

  @Get('/weather-by-ip')
  @Throttle({ default: { limit: 5, ttl: 5 * 60 } })
  async getWeatherByIp(@Query('ip') ip: string) {
    const res = await this.weatherReportService.getWeatherByIp(ip);
    return res;
  }
}

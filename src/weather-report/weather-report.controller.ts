import { Controller, Get, Query } from '@nestjs/common';
import { WeatherReportService } from './weather-report.service';

@Controller('weather-report')
export class WeatherReportController {
  constructor(private readonly weatherReportService: WeatherReportService) {}

  @Get('/weather-by-ip')
  async getWeatherByIp(@Query('ip') ip: string) {
    const res = await this.weatherReportService.getWeatherByIp(ip);
    return res;
  }
}

import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { WeatherReportService } from './weather-report.service';
import { Throttle } from '@nestjs/throttler';
import { defaultIp } from 'src/constants/strings';
import { isValidPublicIp } from 'src/utils/ip-validator';

@Controller('weather-report')
export class WeatherReportController {
  constructor(private readonly weatherReportService: WeatherReportService) {}

  @Get('/weather-by-ip')
  @Throttle({ default: { limit: 5, ttl: 1 * 60 * 1000 } })
  async getWeatherByIp(@Query('ip') ip: string) {
    if (!ip || ip == '') ip = defaultIp;
    else if (!isValidPublicIp(ip)) {
      throw new BadRequestException('Invalid IP address or private IP');
    }
    const res = await this.weatherReportService.getWeatherByIp(ip);
    return res;
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { LocationService } from 'src/third-party/location/location.service';
import { WeatherService } from 'src/third-party/weather/weather.service';
@Injectable()
export class WeatherReportService {
  constructor(
    private readonly locationService: LocationService,
    private readonly weatherService: WeatherService,
  ) {}
  async getWeatherByIp(ip: string) {
    const ipInfo = await this.locationService.getGeolocation(ip);
    const latitude = ipInfo.latitude;
    const longitude = ipInfo.longitude;
    const weatherData = await this.weatherService.getWeatherInfo(
      latitude,
      longitude,
    );
    return weatherData;
  }
}

import { Injectable } from '@nestjs/common';
import { LocationService } from 'src/third-party/location/location.service';
import { WeatherService } from 'src/third-party/weather/weather.service';
import { CacheService } from 'src/utils/cache.service';
@Injectable()
export class WeatherReportService {
  constructor(
    private readonly locationService: LocationService,
    private readonly weatherService: WeatherService,
    private readonly cacheService: CacheService,
  ) {}
  async getWeatherByIp(ip: string) {
    const ipInfo = await this.locationService.getGeolocation(ip);
    const latitude = ipInfo.latitude;
    const longitude = ipInfo.longitude;
    const city = ipInfo.city;

    const key = `${city}_Weather_Data`;
    let weatherData;

    //fetch data from cache
    const cachedData = await this.cacheService.getValue(key);
    if (cachedData) {
      weatherData = cachedData;
    } else {
      weatherData = await this.weatherService.getWeatherInfo(
        latitude,
        longitude,
      );

      // set data in cache
      await this.cacheService.setValue(key, weatherData, 600);
    }

    return weatherData;
  }
}

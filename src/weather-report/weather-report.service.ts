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
    const country = ipInfo.country;
    const key = `${city}_Weather_Data`;
    let aggregatedWeatherData: AggregatedWeatherData;

    //fetch data from cache if available
    const cachedData = await this.cacheService.getValue(key);
    if (cachedData) {
      aggregatedWeatherData = cachedData as AggregatedWeatherData;
    } else {
      // if data is not in cache then call external weather api
      const weatherData = await this.weatherService.getWeatherInfo(
        latitude,
        longitude,
      );

      aggregatedWeatherData = {
        ip,
        location: {
          city,
          country,
        },
        weather: {
          temperature: weatherData.current.temp_c,
          humidity: weatherData.current.humidity,
          description:
            weatherData.current?.condition?.text ?? 'Description not available',
        },
      };

      // set data in cache
      await this.cacheService.setValue(key, aggregatedWeatherData, 600);
    }

    return aggregatedWeatherData;
  }
}

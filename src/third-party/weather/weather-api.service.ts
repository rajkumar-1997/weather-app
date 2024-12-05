import { Injectable } from '@nestjs/common';
import { ApiClientService } from 'src/utils/api-client.service';
import { WeatherDataProvider } from './weather.interface';
import { weatherApiUrl } from 'src/constants/strings';
@Injectable()
export class WeatherApiService implements WeatherDataProvider {
  constructor(private readonly apiClientService: ApiClientService) {}

  async getCurrentWeatherData(latitude: number, longitude: number) {
    const params = {
      key: process.env.WEATHER_API_KEY,
      q: `${latitude},${longitude}`,
    };
    const data = await this.apiClientService.get(weatherApiUrl, {}, params);
    return data;
  }
}

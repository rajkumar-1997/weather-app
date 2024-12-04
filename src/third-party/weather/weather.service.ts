import { Inject, Injectable } from '@nestjs/common';
import { WeatherDataProvider } from './weather.interface';
@Injectable()
export class WeatherService {
  constructor(
    @Inject('WEATHER_DATA_PROVIDER')
    private readonly weatherDataProvider: WeatherDataProvider,
  ) {}
  async getWeatherInfo(latitude: number, longitude: number) {
    try {
      const weatherData = await this.weatherDataProvider.getCurrentWeatherData(
        latitude,
        longitude,
      );
      return weatherData;
    } catch (error) {}
  }
}

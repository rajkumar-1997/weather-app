import { Module } from '@nestjs/common';
import { ApiClientService } from 'src/utils/api-client.service';
import { UtilsModule } from 'src/utils/utils.module';
import { WeatherApiService } from './weather-api.service';
import { WeatherService } from './weather.service';

@Module({
  imports: [UtilsModule],
  providers: [
    {
      provide: 'WEATHER_DATA_PROVIDER',
      useFactory: (apiClientService: ApiClientService) => {
        const selectedProvider =
          process.env.WEATHER_DATA_PROVIDER || 'weatherapi';
        if (selectedProvider == 'weatherapi') {
          return new WeatherApiService(apiClientService);
        }
        throw new Error('Invalid Weather Data Provider');
      },
      inject: [ApiClientService],
    },
    WeatherService,
  ],
  exports: ['WEATHER_DATA_PROVIDER', WeatherService],
})
export class WeatherModule {}

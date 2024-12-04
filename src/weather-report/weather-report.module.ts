import { Module } from '@nestjs/common';
import { WeatherReportService } from './weather-report.service';
import { WeatherReportController } from './weather-report.controller';
import { LocationModule } from 'src/third-party/location/location.module';
import { WeatherModule } from 'src/third-party/weather/weather.module';

@Module({
  imports: [LocationModule, WeatherModule],
  providers: [WeatherReportService],
  controllers: [WeatherReportController],
})
export class WeatherReportModule {}

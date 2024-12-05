import { Module } from '@nestjs/common';
import { WeatherReportService } from './weather-report.service';
import { WeatherReportController } from './weather-report.controller';
import { LocationModule } from 'src/third-party/location/location.module';
import { WeatherModule } from 'src/third-party/weather/weather.module';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [LocationModule, WeatherModule, UtilsModule],
  providers: [WeatherReportService],
  controllers: [WeatherReportController],
})
export class WeatherReportModule {}

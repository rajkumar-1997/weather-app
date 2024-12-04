import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilsModule } from './utils/utils.module';
import { ThirdPartyModule } from './third-party/third-party.module';
import { WeatherReportModule } from './weather-report/weather-report.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UtilsModule,
    WeatherReportModule,
    ThirdPartyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

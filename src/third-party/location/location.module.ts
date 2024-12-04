import { Module } from '@nestjs/common';
import { IpstackService } from './ipstack.service';
import { UtilsModule } from 'src/utils/utils.module';
import { ApiClientService } from 'src/utils/api-client.service';
import { LocationService } from './location.service';

@Module({
  imports: [UtilsModule],
  providers: [
    {
      provide: 'IP_INFO_PROVIDER',
      useFactory: (apiClientService: ApiClientService) => {
        const selectedProvider = process.env.IP_INFO_PROVIDER || 'ipstack';
        if (selectedProvider == 'ipstack') {
          return new IpstackService(apiClientService);
        }
        throw new Error('Invalid Ip Info Provider');
      },
      inject: [ApiClientService],
    },
    LocationService,
  ],
  exports: ['IP_INFO_PROVIDER', LocationService],
})
export class LocationModule {}

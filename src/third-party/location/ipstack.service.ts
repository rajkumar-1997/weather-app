import { Injectable } from '@nestjs/common';
import { IpInformationProvider } from './location.interface';
import { ApiClientService } from 'src/utils/api-client.service';
import { ipStackUrl } from 'src/constants/strings';
import { mockIpInfoResponse } from 'src/constants/objects';
@Injectable()
export class IpstackService implements IpInformationProvider {
  constructor(private readonly apiClientService: ApiClientService) {}
  async getIpInformation(ip: string) {
    try {
      const url = `${ipStackUrl}/${ip}?access_key=${process.env.IP_STACK_API_KEY}`;
      const ipInfo = await this.apiClientService.get(url, {}, {});
      const type = ipInfo.type;
      const countryName = ipInfo.country_name;
      const city = ipInfo.city;
      const latitude = ipInfo.latitude;
      const longitude = ipInfo.longitude;
      return { type, countryName, city, latitude, longitude };
      return mockIpInfoResponse;
    } catch (error) {}
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { IpInformationProvider } from './location.interface';
@Injectable()
export class LocationService {
  constructor(
    @Inject('IP_INFO_PROVIDER')
    private readonly ipInfoProvider: IpInformationProvider,
  ) {}
  async getGeolocation(ip: string) {
    const locationData = await this.ipInfoProvider.getIpInformation(ip);
    return locationData;
  }
}

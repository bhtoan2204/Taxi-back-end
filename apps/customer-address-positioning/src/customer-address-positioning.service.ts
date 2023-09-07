import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomerAddressPositioningService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) { }

  async setLatLong(_id: string, dto: any) {
    const filterQuery = { _id: _id }
    const updateQuery = { latitude: dto.latitude, longitude: dto.longitude }
    try {
      const updatedUser = await this.userRepository.findOneAndUpdate(filterQuery, updateQuery);
      return { latitude: updatedUser.latitude, longitude: updatedUser.longitude };
    }
    catch (e) {
      throw e;
    }
  }

  async getGeoCoding(address: string) {
    try {
      const response = await this.httpService.axiosRef.get(
        `https://api.openrouteservice.org/geocode/search?api_key=${this.configService.get('API_KEY')}&text=${address}&boundary.country=VN&size=1`,
      );
      const longitude = response.data.features[0].geometry.coordinates[0];
      const latitude = response.data.features[0].geometry.coordinates[1];
      return { latitude, longitude };
    } catch (error) {
      throw error;
    }
  }
}

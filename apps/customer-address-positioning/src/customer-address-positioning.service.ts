import { ConflictException, Injectable } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { BookingRequestRepository } from './repositories/bookingRequest.repository';

@Injectable()
export class CustomerAddressPositioningService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly bookingRequestRepository: BookingRequestRepository
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

  async getGeoCoding(dto: any) {
    try {
      const response = await this.httpService.axiosRef.get(
        `https://api.openrouteservice.org/geocode/search?api_key=${this.configService.get('API_KEY')}&text=${dto.address}&boundary.country=VN&size=1`,
      );
      const longitude = response.data.features[0].geometry.coordinates[0];
      const latitude = response.data.features[0].geometry.coordinates[1];
      return { latitude, longitude };
    } catch (error) {
      throw error;
    }
  }

  async getDriverLocation(bookingId: string) {
    try {
      const bookingRequest = await this.bookingRequestRepository.findOne({ _id: bookingId });
      if (!bookingRequest.driver_id) {
        throw new ConflictException('This Booking Request have not caught by any driver yet');
      }
      const driver = await this.userRepository.findOne({ _id: bookingRequest.driver_id });
      return {
        driver_name: driver.full_name,
        driver_phone: driver.phone,
        driver_latitude: driver.latitude,
        driver_longitude: driver.longitude
      };
    }
    catch (e) {
      throw e;
    }
  }
}

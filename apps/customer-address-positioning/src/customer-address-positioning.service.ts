import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class CustomerAddressPositioningService {
  constructor(
    private readonly userRepository: UsersRepository
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
}

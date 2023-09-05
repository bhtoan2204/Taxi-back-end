import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
    UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { CreateUserRequest } from './dto/create-user.request';
import { User } from './schemas/users.schema';
import { LatLongRequest } from './dto/latlong-request';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private configService: ConfigService) { }

    async createUser(request: CreateUserRequest) {
        await this.validateCreateUserRequest(request);
        const user = await this.usersRepository.create({
            phone: request.phone,
            password: await bcrypt.hash(request.password, 10),
            full_name: request.full_name,
            role: request.role,
            longitude: 0,
            latitude: 0
        });
        return user;
    }

    private async validateCreateUserRequest(request: CreateUserRequest) {
        let user: User;
        try {
            user = await this.usersRepository.findOne({
                phone: request.phone,
            });
        } catch (err) { }

        if (user) {
            throw new UnprocessableEntityException('Phone already exists.');
        }
    }

    async validateUser(phone: string, password: string, role: string) {
        const user = await this.usersRepository.findOne({ phone });
        const passwordIsValid = await bcrypt.compare(password, user.password);
        const roleIsValid = (role === user.role)
        if (!passwordIsValid) {
            throw new UnauthorizedException('Credentials are not valid.');
        }
        else if (!roleIsValid) {
            throw new UnauthorizedException('Role is not valid.');
        }
        else return user;
    }

    async getUserToRefresh(phone: string) {
        const user = await this.usersRepository.findOne({ phone });
        return user;
    }

    async getUser(getUserArgs: Partial<User>) {
        return this.usersRepository.findOne(getUserArgs);
    }

    async updateLatLong(request: LatLongRequest, _id: any) {
        const updatedUser = await this.usersRepository.findOneAndUpdate({ _id: _id }, {
            $set: {
                latitude: request.latitude,
                longitude: request.longitude
            }, new: true
        })
        if (!updatedUser) {
            throw new NotFoundException(`User not found with ID: ${_id}`);
        }

        return updatedUser;
    }
}
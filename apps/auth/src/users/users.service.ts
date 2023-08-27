import {
    Injectable,
    UnauthorizedException,
    UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { CreateUserRequest } from './dto/create-user.request';
import { User } from './schemas/users.schema';
import { Role } from '@app/common';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) { }

    async createUser(request: CreateUserRequest) {
        await this.validateCreateUserRequest(request);
        const user = await this.usersRepository.create({
            ...request,
            password: await bcrypt.hash(request.password, 10),
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

    async validateUser(phone: string, password: string, role: Role) {
        const user = await this.usersRepository.findOne({ phone });
        const passwordIsValid = await bcrypt.compare(password, user.password);
        //const roleIsValid = await (role === user.role);
        if (!passwordIsValid) {
            throw new UnauthorizedException('Credentials are not valid.');
        }
        // else if (!roleIsValid) {
        //     throw new UnauthorizedException('Role is not valid')
        // }
        return user;
    }

    async getUser(getUserArgs: Partial<User>) {
        return this.usersRepository.findOne(getUserArgs);
    }
}
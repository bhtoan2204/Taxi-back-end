import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from './../users/users.service';
import { Role } from '@app/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({ usernameField: 'phone' });
  }

  async validate(phone: string, password: string, role: Role) {
    try {
      return this.usersService.validateUser(phone, password, role);
    }
    catch (err) {
      throw err
    }
  }
}
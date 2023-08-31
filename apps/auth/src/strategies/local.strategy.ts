import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from './../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly usersService: UsersService) {
    super({
      usernameField: 'phone',
      passwordField: 'password',
      passReqToCallback: true
    });
  }

  async validate(request: any, phone: string, password: string) {
    try {
      const role = request.body.role;
      return this.usersService.validateUser(phone, password, role);
    }
    catch (err) {
      throw err
    }
  }
}
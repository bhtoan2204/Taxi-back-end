import { Controller, Post, Res, UseGuards, Req, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Response, Request } from 'express';
import { AuthService, TokenPayload } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './users/schemas/users.schema';
import JwtRefreshGuard from './guards/jwt-refresh.guard';
import { authenticate } from 'passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() request
  ) {
    return await this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@CurrentUser() user: User) {
    return this.authService.logout(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(
    @CurrentUser() user: User,
    @Req() request: Request
  ) {
    return this.authService.refresh(user, request.headers.authentication);  
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser(@CurrentUser() user: User){
    return user;
  }
}
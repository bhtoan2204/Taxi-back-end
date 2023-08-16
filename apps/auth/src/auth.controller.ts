import { Controller, Post, Res, UseGuards, Req } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Response } from 'express';
import { AuthService, TokenPayload } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './users/schemas/users.schema';
import JwtRefreshGuard from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() request
  ) {
    return await this.authService.login(request.user);
    // response.send(request.user);
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
    @Req() request
  ) {
    return this.authService.refresh(user, request);  
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser(@CurrentUser() user: User){
    return user;
  }
}
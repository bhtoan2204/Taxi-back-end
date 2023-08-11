import { Controller, Post, Res, UseGuards, Req } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Response } from 'express';
import { AuthService, TokenPayload } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import JwtAuthGuard from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './users/schemas/users.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.login(request.user, response);
    // response.send(request.user);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    this.authService.logout(response);
  }

  @Post('refresh')
  async refresh(@CurrentUser() user: User, @Res({ passthrough: true }) response: Response) {
    this.authService.refresh(user, response);
    response.send({ message: 'Token refreshed successfully.' });
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser(@CurrentUser() user: User){
    return user;
  }
}
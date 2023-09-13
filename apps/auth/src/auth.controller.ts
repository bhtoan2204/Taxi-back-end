import { Controller, Post, UseGuards, Req, Body, Headers } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './users/schemas/users.schema';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { ApiTags } from '@nestjs/swagger';
import { LoginFormDTO } from './dto/loginForm.requests';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() dto: LoginFormDTO, @Req() request) {
    return await this.authService.login(request.user);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('logout') 
  async logout(@Req() request) {
    const user = request.user;
    return this.authService.logout(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(
    @Req() request, @Headers('authentication') authentication: string) {
    const user = request.user;
    return this.authService.refresh(user, request.headers.authentication);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser(@CurrentUser() user: User) {
    return user;
  }
}
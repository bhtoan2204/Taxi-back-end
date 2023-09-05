import { Body, Controller, Post, Patch, Headers, UseGuards, Req } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { UsersService } from './users.service';
import { LatLongRequest } from './dto/latlong-request';
import { JwtAuthGuard } from '@app/common';

@Controller('auth/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('createNewUser')
  async createUser(@Body() request: CreateUserRequest) {
    return this.usersService.createUser(request);
  }

  @Patch('updateLocation')
  @UseGuards(JwtAuthGuard)
  async updateLocation(@Req() req, @Body() request: LatLongRequest) {
    const userId = req.user._id;
    return this.usersService.updateLatLong(request, userId);
  }
}
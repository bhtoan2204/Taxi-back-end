import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from './users/schemas/users.schema';
import { UsersRepository } from './users/users.repository';
import { RefreshTokenRepository } from './refreshToken/refreshToken.repository';
import { RefreshToken } from './refreshToken/schemas/refreshToken.schema';

export interface TokenPayload {
  userId: string;
  role: string;
  phone: string
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenRepository

  ) { }

  async login(user: User, response: Response) {
    const { accessToken, refreshToken } = await this.getToken(user._id, user.role, user.phone);
    try {
      await this.refreshTokenRepository.create(
        { 
          refresh_token: refreshToken 
        }
      );
      return {
        accessToken,
        refreshToken
      }
    }
    catch (err) {
      throw new ConflictException(err)
    }
  }

  logout(response: Response) {
    
  }

  async refresh(user: User, response: Response) {

  }

  async getToken(userId: any, role: string, phone: string) {
    const jwtPayload: TokenPayload = {
      userId, role, phone
    };


    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '5m'
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_SECRET_REFRESH'),
        expiresIn: '3d'
      })
    ])
    return { accessToken, refreshToken }
  }
}
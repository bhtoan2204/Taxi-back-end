import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from './users/schemas/users.schema';
import { RefreshTokenRepository } from './refreshToken/refreshToken.repository';

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

  async login(user: User) {
    const { accessToken, refreshToken } = await this.getToken(user._id, user.role, user.phone);
    try {
      await this.refreshTokenRepository.create(
        {
          refresh_token: refreshToken,
          user_id: user._id
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

  async logout(user: User) {
    this.refreshTokenRepository.delete({ user_id: user._id })
  }

  async refresh(user: User, token: any) {
    const { accessToken, refreshToken } = await this.getToken(user._id, user.role, user.phone);
    try {
      await this.refreshTokenRepository.findOneAndUpdate({ refresh_token: token }, { refresh_token: refreshToken });
    }
    catch (err) {
      if (err == NotFoundException) {
        this.refreshTokenRepository.delete({ refresh_token: token });
        throw UnauthorizedException;
      }
      else {
        throw err
      };
    }
    return { accessToken, refreshToken }
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
import { AuthGuard } from '@nestjs/passport';

export default class JwtRefreshGuard extends AuthGuard('refresh') {}

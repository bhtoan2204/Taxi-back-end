import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Role } from '..';

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const user = this.getUser(context);
        const check = (user.role === Role.ADMIN);
        if (!check){
            throw new UnauthorizedException('You not allowed to access this resource')
        }
        return true;
    }

    private getUser(context: ExecutionContext) {
        let user: any;
        if (context.getType() === 'rpc') {
            user = context.switchToRpc().getData().user;
        } else if (context.getType() === 'http') {
            user = context.switchToHttp().getRequest().user;
        }
        if (!user) {
            throw new UnauthorizedException(
                'No value was provided for User',
            );
        }
        return user;
    }
}
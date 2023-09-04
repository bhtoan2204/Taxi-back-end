import { ForbiddenException, Injectable, NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';

interface JwtPayload {
    userId: string;
    role: string;
    phone: string;
}

@Injectable()
export class AdminMiddleware implements NestMiddleware {
    constructor(private configService: ConfigService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authentication.toString();
            const secretKey = this.configService.get<string>('JWT_SECRET');
            const decodedToken = jwt.verify(token, secretKey) as JwtPayload;
            const role = decodedToken.role;
            if (role === 'ADMIN') {
                next();
            }
            else {
                throw new ForbiddenException('You do not have permission to access this resource.');
            }
        }
        catch (e) {
            throw e;
        }
    }
}
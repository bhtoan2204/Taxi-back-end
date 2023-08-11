import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { RefreshToken } from './schemas/refreshToken.schema';

@Injectable()
export class RefreshTokenRepository extends AbstractRepository<RefreshToken> {
    protected readonly logger = new Logger(RefreshTokenRepository.name);

    constructor(
        @InjectModel(RefreshToken.name) refreshTokenModel: Model<RefreshToken>,
        @InjectConnection() connection: Connection,
    ) {
        super(refreshTokenModel, connection);
    }
}
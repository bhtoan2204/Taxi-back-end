import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Reliability } from "../schema/reliability.schema";

@Injectable()
export class ReliabilityRepository extends AbstractRepository<Reliability>{
    protected readonly logger = new Logger(ReliabilityRepository.name);

    constructor(
        @InjectModel(Reliability.name) bookingRequestModel: Model<Reliability>,
        @InjectConnection() connection: Connection
    ) {
        super(bookingRequestModel, connection)
    }
}
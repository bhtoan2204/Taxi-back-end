import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { StatusTracker } from "../schemas/statusTracker.schema";

@Injectable()
export class StatusTrackerRepository extends AbstractRepository<StatusTracker>{
    protected readonly logger = new Logger(StatusTrackerRepository.name);

    constructor(
        @InjectModel(StatusTracker.name) statusTrackerModel: Model<StatusTracker>,
        @InjectConnection() connection: Connection
    ) {
        super(statusTrackerModel, connection)
    }
}
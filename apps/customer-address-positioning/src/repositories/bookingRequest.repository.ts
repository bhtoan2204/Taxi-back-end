import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { BookingRequest } from "../schema/bookingRequest.schema";

@Injectable()
export class BookingRequestRepository extends AbstractRepository<BookingRequest>{
    protected readonly logger = new Logger(BookingRequestRepository.name);

    constructor(
        @InjectModel(BookingRequest.name) bookingRequestModel: Model<BookingRequest>,
        @InjectConnection() connection: Connection
    ) {
        super(bookingRequestModel, connection)
    }
}
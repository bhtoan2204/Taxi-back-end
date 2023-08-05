import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { Booking } from "./schemas/booking.schema";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model, connection } from "mongoose";

@Injectable()
export class BookingRepository extends AbstractRepository<Booking>{
    protected readonly logger = new Logger(BookingRepository.name);

    constructor(
        @InjectModel(Booking.name) bookingModel: Model<Booking>, 
        @InjectConnection() connection:Connection){
        super(bookingModel, connection)
    }   
}
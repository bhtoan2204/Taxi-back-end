export * from './database/database.module';
export * from './database/abstract.repository';
export * from './database/abstract.schema';
export * from './rmq/rmq.service';
export * from './rmq/rmq.module';
export * from './auth/auth.module';
export * from './auth/jwt-auth.guard';

export enum Role {
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER",
    DRIVER = "DRIVER"
}

export enum CarType {
    BIKE = "BIKE",
    CAR = "CAR"
}

export enum Status {
    CANCEL = "CANCEL",
    PENDING = "PENDING",
    CONFIRM = "CONFIRM",
    INPROGRESS = "INPROGRESS",
    COMPLETED = "COMPLETED"
}
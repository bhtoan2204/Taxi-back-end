import { Injectable } from '@nestjs/common';

@Injectable()
export class DriverStatusTrackerService {
  getHello(): string {
    return 'Hello World!';
  }
}

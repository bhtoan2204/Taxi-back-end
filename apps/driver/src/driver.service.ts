import { Injectable } from '@nestjs/common';

@Injectable()
export class DriverService {
  getHello(): string {
    return 'Hello World! From Driver';
  }
}

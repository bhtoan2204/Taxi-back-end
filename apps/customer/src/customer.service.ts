import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CustomerService {
  getHello(): string {
    return 'Hello World! From Customer';
  }
}

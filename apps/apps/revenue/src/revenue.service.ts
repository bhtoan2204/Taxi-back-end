import { Injectable } from '@nestjs/common';

@Injectable()
export class RevenueService {
  getHello(): string {
    return 'Hello World!';
  }
}

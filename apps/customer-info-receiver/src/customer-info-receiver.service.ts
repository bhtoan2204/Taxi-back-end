import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerInfoReceiverService {
  getHello(): string {
    return 'Hello World!';
  }
}

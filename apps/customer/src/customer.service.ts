import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CustomerService {
  private logger = new Logger(CustomerService.name)
  getHello(): string {
    return 'Hello World!';
  }
  createCustomer(data: any){
    this.logger.log('Customer...', data)
  }
}

import { Injectable } from '@nestjs/common';
import { GetInformation } from '../dto/get-infor.request';

@Injectable()
export class AdminService {
  getHello(): string {
    return 'Hello World!';
  }

  async getInformation(request: GetInformation): Promise<any>{
    
  }
}

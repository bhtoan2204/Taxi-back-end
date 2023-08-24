import { Injectable } from '@nestjs/common';

@Injectable()
export class DriverStatusTrackerService {
  getHello(): string {
    return 'Hello World!';
  }

  async getMessage(data: any){
    console.log('goes here')
    console.log(data);
  }
}

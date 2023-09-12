import { Inject, Injectable } from '@nestjs/common';
import { LOCATE_SERVICE, RECEIVER_SERVICE, UserInforPayload } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Twilio } from 'twilio';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from '@app/common/firebase/firebase.service';

@Injectable()
export class DriverService {
  private twilioClient: Twilio;
  constructor(
    @Inject(LOCATE_SERVICE) private locateClient: ClientProxy,
    @Inject(RECEIVER_SERVICE) private receiverClient: ClientProxy,
    private readonly configService: ConfigService,
    private readonly firebaseService: FirebaseService
  ) {
    const accountSid = configService.get('TWILIO_ACCOUNT_SID');
    const authToken = configService.get('TWILIO_AUTH_TOKEN');
    this.twilioClient = new Twilio(accountSid, authToken)
  }

  async sendSms(phone: string, driver: UserInforPayload) {
    try {
      await this.twilioClient.messages.create({
        to: phone,
        from: this.configService.get('TWILIO_PHONE_NUMBER'),
        body: "Tài xế " + driver.full_name + " sẽ là tài xế của bạn. Vui lòng liên lạc qua số điện thoại: " + driver.phone
      })
      return { message: "Gửi tin nhắn thành công" }
    }
    catch (e) {
      return { message: "Lỗi khi gửi tin nhắn: " + e }
    }
  }

  async sendNotification(customer_id: string, driver: UserInforPayload) {
    try {
      const database = this.firebaseService.getAdmin().database();
      const usersRef = database.ref('users');
      usersRef.once('value')
        .then((snapshot) => {
          const users = snapshot.val();

          for (const userId in users) {
            const user = users[userId];
            const fcmToken = user.fcm_token;
            this.firebaseService.sendNotificationToUser(fcmToken, "Taxi Thông báo", driver.full_name + " sẽ là tài xế của bạn.\nHãy liên lạc qua số điện thoại " + driver.phone);
          }
        })
        .catch((error) => {
          console.error('Error fetching FCM tokens:', error);
        });
    }
    catch (e) {
      throw e;
    }
  }

  async setLatLong(_id: string, dto: any) {
    try {
      const check = this.locateClient.send('set_LatLong', { _id, dto });
      const requests = await lastValueFrom(check);
      return requests;
    }
    catch (e) {
      throw e;
    }
  }

  async getNearBookingRequest(dto: any) {
    try {
      const check = this.receiverClient.send('get_nearby_booking_requests', { dto });
      const requests = await lastValueFrom(check);
      return requests;
    }
    catch (e) {
      throw e;
    }
  }

  async acceptBookingRequest(driver_id: string, booking_id: string) {
    try {
      const check = this.receiverClient.send('accept_booking_request', { driver_id, booking_id });
      const requests = await lastValueFrom(check);
      return requests;
    }
    catch (e) {
      throw e;
    }
  }

  async getHistory(driver_id: string) {
    try {
      const check = this.receiverClient.send('get_history_driver', { driver_id });
      const requests = await lastValueFrom(check);
      return requests;
    }
    catch (e) {
      throw e;
    }
  }

  async setCompleted(driver_id: string, booking_id: string) {
    try {
      const check = this.receiverClient.send('set_completed', { driver_id, booking_id });
      const requests = await lastValueFrom(check);
      return requests;
    }
    catch (e) {
      throw e;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { error } from 'console';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private readonly firebaseAdmin: admin.app.App;

  constructor() {
    try {
      const serviceAccount = require('../firebase/firebase_service_config.json');

      this.firebaseAdmin = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://taxi-fa3d3-default-rtdb.asia-southeast1.firebasedatabase.app',
      });
    }
    catch (e) {
      throw e;
    }

  }

  public isConnected(): boolean {
    try {
      // Kiểm tra trạng thái của ứng dụng Firebase Admin SDK
      this.firebaseAdmin.database().goOnline();
      return true;
    } catch (error) {
      return false;
    }
  }

  public getAdmin(): admin.app.App {
    return this.firebaseAdmin;
  }

  public sendNotificationToUser(deviceToken: string, title: string, body: string) {
    const message = {
      data: {
        title,
        body,
      },
      token: deviceToken,
    };
    return this.firebaseAdmin.messaging().send(message)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }
}

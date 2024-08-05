import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

@Injectable()
export class FirebaseService {
  constructor(private configService: ConfigService) {
    initializeApp({
      credential: cert({
        projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
        clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
        privateKey: configService.get<string>('FIREBASE_PRIVATE_KEY'),
      }),
      storageBucket: configService.get<string>('FIREBASE_STORAGE_BUCKET'),
    });
  }

  getBucket() {
    return getStorage().bucket();
  }
}
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

const MONGODB_URI = 'mongodb+srv://antonpash:9HkLmDhekt6YRCaF@cluster0.wpcuwpr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

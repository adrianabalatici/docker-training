import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TaskModule } from "./task/task.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
    }),
    TaskModule],
  controllers: [AppController],
  providers: [AppService, ConfigService]
})
export class AppModule {
  constructor() {
    console.log(`MONGODB_URI: ${process.env.MONGODB_URI}`);
  }
}

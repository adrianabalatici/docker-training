import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs-extra';
@Injectable()
export class AppService {

  private readonly logger = new Logger(AppService.name);

  constructor(private configService: ConfigService) {
    fs.ensureFileSync('./data/data.txt');
  }
  getHello(): string {
    const nodeEnv = this.configService.get<string>('NODE_ENV');
    if (nodeEnv === 'development') {
      return 'This is the development environment message!';
    } else if (nodeEnv === 'production') {
      return 'This is the production environment message!';
    } else {
      return 'This is the default environment message!';
    }
  }

  getData() {
    return fs.readFile('./data/data.txt', 'utf-8');
  }

  postData(data: { timestamp: Date; data: string }) {
    this.logger.log(`here123`);
    fs.ensureFile('./data/data.txt');
    fs.appendFile('./data/data.txt', JSON.stringify(data) + '\n');
  }
}

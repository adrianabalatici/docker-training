import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('get_data')
  getData() {
    return this.appService.getData();
  }

  @Post('post_data')
  postData(@Body() data: {
    timestamp: Date,
    data: string
  } ): void {
    this.appService.postData(data);
  }
}

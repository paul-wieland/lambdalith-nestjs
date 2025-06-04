import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello';
  }

  getWorld(): string {
    return 'World';
  }
}

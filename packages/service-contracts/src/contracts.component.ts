import { Injectable } from '@nestjs/common';

@Injectable()
export class ContractsComponent {
  sayHello() {
    return "Hello, I'm the service contracts!";
  }
}

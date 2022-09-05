import { Inject, Injectable } from '@nestjs/common';

import { UserModel } from './models/user.model';

@Injectable()
export class UsersComponent {
  constructor(@Inject('UserModel') private readonly users: typeof UserModel) {}

  async sayHello() {
    return "Hello, I'm the service users!";
  }

  async getUserById(id: string) {
    return this.users.findByPk(id);
  }
}

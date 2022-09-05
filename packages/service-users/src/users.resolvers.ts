/* eslint-disable max-classes-per-file */
import { Resolver, Query } from '@nestjs/graphql';

import { UsersComponent } from './users.component';

@Resolver('User')
export class UserResolver {
  constructor(private readonly component: UsersComponent) {}

  @Query('HelloUser')
  sayHello() {
    return this.component.sayHello();
  }
}

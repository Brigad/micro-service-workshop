import { Resolver, Query } from '@nestjs/graphql';

import { ContractsComponent } from './contracts.component';

@Resolver('Contract')
export class ContractResolver {
  constructor(private readonly component: ContractsComponent) {}

  @Query('HelloContract')
  sayHello() {
    return this.component.sayHello();
  }
}

import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { DatabaseModule } from '@workshop/util-sequelize';

import path from 'path';

import { UsersComponent } from './users.component';

import * as Resolvers from './users.resolvers';

import { UserModel } from './models/user.model';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      introspection: true,
      typePaths: ['./**/*.gql'],
    }),
    DatabaseModule.forRoot(process.env.DB_NAME ?? '', [path.resolve(__dirname, '**/models/*.model.*')]),
  ],
  providers: [
    UsersComponent,
    {
      provide: 'UserModel',
      useValue: UserModel,
    },
    ...Object.values(Resolvers),
  ],
})
export class AppModule {}

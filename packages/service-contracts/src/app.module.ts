import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { DatabaseModule } from '@workshop/util-sequelize';

import path from 'path';

import { ContractsComponent } from './contracts.component';

import * as Resolvers from './contracts.resolvers';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      introspection: true,
      typePaths: ['./**/*.gql'],
    }),
    DatabaseModule.forRoot(process.env.DB_NAME ?? 'contracts', [path.resolve(__dirname, '**/models/*.model.*')]),
  ],
  providers: [ContractsComponent, ...Object.values(Resolvers)],
})
export class AppModule {}

import { Module, Global, DynamicModule } from '@nestjs/common';

import { databaseProvider } from './provider';

@Module({})
@Global()
export class DatabaseModule {
  static forRoot(database: string, modulePaths: string[]): DynamicModule {
    const providers = [databaseProvider(database, modulePaths)];
    return {
      module: DatabaseModule,
      providers,
      exports: providers,
    };
  }
}

import { DynamicModule } from '@nestjs/common';
export declare class DatabaseModule {
    static forRoot(database: string, modulePaths: string[]): DynamicModule;
}

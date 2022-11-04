/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { camelCase, mapValues } from 'lodash';
import { Sequelize } from 'sequelize-typescript';

export const databaseProvider = (database: string, modelPaths: string[]): any => {
  console.log(
    `host: ${process.env.DB_HOST} | user: ${process.env.DB_USER} | password : ${process.env.DB_PASSWORD} | port: ${process.env.DB_PORT} | database: ${database}`,
  );
  return {
    provide: 'SequelizeToken',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: '127.0.0.1',
        username: 'postgres',
        password: 'mysecretpassword',
        port: 5432,
        database,
        modelPaths,
        modelMatch: (filename, member) => {
          if (!filename.length) {
            return false;
          }
          const res = camelCase(filename.substring(0, filename.indexOf('.model')));
          return `${res}Model` === camelCase(member);
        },
      });
      mapValues(sequelize.models, (model: any) => {
        if (model.setup) {
          model.setup();
        }
      });
      try {
        await sequelize.authenticate();
        console.info('Success on database connection initialisation');
      } catch (err) {
        console.error(err, 'Error on sequelize initialization, exiting');
        process.kill(1);
      }
      await sequelize.sync();
      return sequelize;
    },
  };
};

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProvider = void 0;
const lodash_1 = require("lodash");
const sequelize_typescript_1 = require("sequelize-typescript");
const databaseProvider = (database, modelPaths) => ({
    provide: 'SequelizeToken',
    useFactory: () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const sequelize = new sequelize_typescript_1.Sequelize({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            port: parseInt((_a = process.env.DB_PORT) !== null && _a !== void 0 ? _a : '0', 10),
            database,
            modelPaths,
            modelMatch: (filename, member) => {
                if (!filename.length) {
                    return false;
                }
                const res = (0, lodash_1.camelCase)(filename.substring(0, filename.indexOf('.model')));
                return `${res}Model` === (0, lodash_1.camelCase)(member);
            },
        });
        (0, lodash_1.mapValues)(sequelize.models, (model) => {
            if (model.setup) {
                model.setup();
            }
        });
        try {
            yield sequelize.authenticate();
            console.info('Success on database connection initialisation');
        }
        catch (err) {
            console.error(err, 'Error on sequelize initialization, exiting');
            process.kill(1);
        }
        yield sequelize.sync();
        return sequelize;
    }),
});
exports.databaseProvider = databaseProvider;
//# sourceMappingURL=provider.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppConfigBuilder = void 0;
class CreateAppConfigBuilder {
    static createFromArgs(args) {
        return {
            hasDynamicSql: args.includes('--dynamic-sql'),
            hasStaticSql: args.includes('--static-sql'),
            hasMongo: args.includes('--nosql'),
            hasStaticRedis: args.includes('--static-redis'),
            hasAws: args.includes('--aws'),
            hasStructureAccess: args.includes('--structure-access'),
        };
    }
}
exports.CreateAppConfigBuilder = CreateAppConfigBuilder;
//# sourceMappingURL=CreateAppConfigBuilder.js.map
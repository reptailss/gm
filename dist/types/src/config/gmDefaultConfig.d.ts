import { GmConfig, GmEndpointsConfig, GmNoSqlRepositoryConfig, GmSqlRepositoryConfig } from "../os-core";
export declare const gmDefaultConfig: {
    readonly default: GmConfig;
    readonly baseEndpoints: GmEndpointsConfig;
    readonly sqlByStaticDbConnection: GmSqlRepositoryConfig;
    readonly sqlByDynamicDomain: GmSqlRepositoryConfig;
    readonly sqlByDynamicLeId: GmSqlRepositoryConfig;
    readonly noSqlByYearAndMonth: GmNoSqlRepositoryConfig;
};

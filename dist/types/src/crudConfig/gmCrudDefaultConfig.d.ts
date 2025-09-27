import { GmCrudConfig, GmCrudEndpointsConfig, GmCrudNoSqlRepositoryConfig, GmCrudSqlRepositoryConfig } from 'os-core-ts';
export declare const gmCrudDefaultConfig: {
    readonly default: GmCrudConfig;
    readonly baseEndpoints: GmCrudEndpointsConfig;
    readonly sqlByStaticDbConnection: GmCrudSqlRepositoryConfig;
    readonly sqlByDynamicDomain: GmCrudSqlRepositoryConfig;
    readonly sqlByDynamicLeId: GmCrudSqlRepositoryConfig;
    readonly noSqlByYearAndMonth: GmCrudNoSqlRepositoryConfig;
};

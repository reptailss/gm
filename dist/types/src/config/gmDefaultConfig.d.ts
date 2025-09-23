import { GmConfig, GmEndpointsConfig, GmNoSqlModelConfig, GmSqlModelConfig } from "./types";
export declare const gmDefaultConfig: {
    readonly default: GmConfig;
    readonly baseEndpoints: GmEndpointsConfig;
    readonly sqlByStaticDbConnection: GmSqlModelConfig;
    readonly sqlByDynamicDomain: GmSqlModelConfig;
    readonly sqlByDynamicLeId: GmSqlModelConfig;
    readonly noSqlByYearAndMonth: GmNoSqlModelConfig;
};

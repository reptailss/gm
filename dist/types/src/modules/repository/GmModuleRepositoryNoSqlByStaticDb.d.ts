import { IGmModuleRepository } from "./interfaces/gmModuleRepository";
import { IGmModuleRepositoryApi } from "./interfaces/gmModuleRepositoryApi";
import { GmCrudConfig } from "../../os-core";
import { GmAbstractModuleClassRepositoryNoSql } from "./abstractRepository/GmAbstractModuleClassRepositoryNoSql";
export declare class GmModuleRepositoryNoSqlByStaticDb extends GmAbstractModuleClassRepositoryNoSql implements IGmModuleRepository {
    api: IGmModuleRepositoryApi;
    private readonly gmModuleDbConnectionNoSql;
    constructor(config: GmCrudConfig, repositoryVarName: string);
    getPropertyName(): string;
    init(): void;
}

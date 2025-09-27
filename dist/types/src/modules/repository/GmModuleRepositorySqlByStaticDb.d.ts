import { IGmModuleRepository } from "./interfaces/gmModuleRepository";
import { IGmModuleRepositoryApi } from "./interfaces/gmModuleRepositoryApi";
import { GmCrudConfig } from 'os-core-ts';
import { GmAbstractModuleClassRepositorySql } from "./abstractRepository/GmAbstractModuleClassRepositorySql";
export declare class GmModuleRepositorySqlByStaticDb extends GmAbstractModuleClassRepositorySql implements IGmModuleRepository {
    api: IGmModuleRepositoryApi;
    private readonly gmModuleDbConnectionSql;
    constructor(config: GmCrudConfig, repositoryVarName: string);
    getPropertyName(): string;
    init(): void;
}

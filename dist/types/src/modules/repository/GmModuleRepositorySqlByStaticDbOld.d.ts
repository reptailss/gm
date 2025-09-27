import { GmAbstractModuleConstantRepositorySql } from "./abstractRepository/GmAbstractModuleConstantRepositorySql";
import { IGmModuleRepository } from "./interfaces/gmModuleRepository";
import { IGmModuleRepositoryApi } from "./interfaces/gmModuleRepositoryApi";
import { GmCrudConfig } from "../../os-core";
export declare class GmModuleRepositorySqlByStaticDb extends GmAbstractModuleConstantRepositorySql implements IGmModuleRepository {
    api: IGmModuleRepositoryApi;
    private gmModuleDbConnectionSql;
    constructor(config: GmCrudConfig, repositoryVarName: string);
    getPropertyName(): string;
    init(): void;
}

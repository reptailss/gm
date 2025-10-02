import { IGmModuleRepository } from "./interfaces/gmModuleRepository";
import { IGmModuleRepositoryApi } from "./interfaces/gmModuleRepositoryApi";
import { GmCrudConfig } from "../../os-core";
import { GmAbstractModuleClass } from "../abstractModule/GmAbstractModuleClass";
import { GmModuleEntity } from "../entity/GmModuleEntity";
export declare class GmModuleRepositoryByNoSqlMonthAndYear extends GmAbstractModuleClass implements IGmModuleRepository {
    private monthVarName;
    private yearVarName;
    private loaderRepositoryVarName;
    private loaderRepository;
    readonly gmModuleEntity: GmModuleEntity;
    api: IGmModuleRepositoryApi;
    constructor(config: GmCrudConfig, { repositoryVarName, loaderRepositoryVarName, monthVarName, yearVarName, }: {
        repositoryVarName: string;
        loaderRepositoryVarName: string;
        monthVarName: string;
        yearVarName: string;
    });
    getDirName(): string;
    getFileName(): string;
    getPropertyName(): string;
    getInitRepository(): string;
    init(): void;
}

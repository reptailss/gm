import { IGmModuleRepository } from "./interfaces/gmModuleRepository";
import { IGmModuleRepositoryApi } from "./interfaces/gmModuleRepositoryApi";
import { GmCrudConfig } from "../../os-core";
import { GmAbstractModuleClass } from "../abstractModule/GmAbstractModuleClass";
export declare class GmModuleRepositorySqlByDynamicLeId extends GmAbstractModuleClass implements IGmModuleRepository {
    api: IGmModuleRepositoryApi;
    private loaderRepositoryVarName;
    private leIdVarName;
    private loaderRepository;
    constructor(config: GmCrudConfig, { repositoryVarName, loaderRepositoryVarName, leIdVarName, }: {
        repositoryVarName: string;
        loaderRepositoryVarName: string;
        leIdVarName: string;
    });
    getDirName(): string;
    getFileName(): string;
    getPropertyName(): string;
    getInitRepository(): string;
    init(): void;
}

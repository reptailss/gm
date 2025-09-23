import { GmConfig } from "../../../os-core";
import { GmAbstractModuleFn } from "../../abstractModule/GmAbstractModuleFn";
import { IGmModuleFn } from "../../interfaces/gmModule";
export declare abstract class GmAbstractModuleFnModelNoSql extends GmAbstractModuleFn implements IGmModuleFn {
    private readonly modelType;
    private readonly gmModuleDto;
    private readonly gmModuleModelColumns;
    private readonly gmModuleCollectionName;
    private readonly gmModuleDatabaseName;
    constructor(config: GmConfig);
    abstract getPropertyName(): string;
    getDirName(): string;
    getFileName(): string;
    init(): void;
    getColumnsPropertyName(): string;
    getCollectionNamePropertyName(): string;
    getDatabaseNamePropertyName(): string;
    getModelTypePropertyName(): string;
    private getCollectionName;
    private getDatabaseName;
}

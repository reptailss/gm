import { GmAbstractModuleConstant } from "../../abstractModule/GmAbstractModuleConstant";
import { IGmModuleConstant } from "../../interfaces/gmModule";
import { GmConfig } from "../../../os-core";
export declare abstract class GmAbstractModuleConstantModelSql extends GmAbstractModuleConstant implements IGmModuleConstant {
    private readonly modelType;
    private readonly gmModuleDto;
    private readonly gmModuleModelColumns;
    private readonly gmModuleTableName;
    constructor(config: GmConfig);
    abstract getPropertyName(): string;
    getDirName(): string;
    getFileName(): string;
    init(): void;
    getTableNamePropertyName(): string;
    getColumnsPropertyName(): string;
    getModelTypePropertyName(): string;
    private getTableName;
}

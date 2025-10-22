import { GmAbstractModuleClass } from "../abstractModule/GmAbstractModuleClass";
import { IGmModuleClass, IGmModuleClassMethod } from "../interfaces/gmModule";
import { GmCrudConfig } from "../../os-core";
declare class Api {
    private readonly serviceVarName;
    private readonly createDtoToEntityMethod;
    private readonly updateDtoToEntityMethod;
    private readonly entityToDtoMethod;
    constructor(serviceVarName: string, createDtoToEntityMethod: IGmModuleClassMethod, updateDtoToEntityMethod: IGmModuleClassMethod, entityToDtoMethod: IGmModuleClassMethod);
    createDtoToEntity(): string;
    updateDtoToEntity(): string;
    entityToDto(): string;
}
export declare class GmModuleMapper extends GmAbstractModuleClass implements IGmModuleClass {
    private readonly callVarNames;
    api: Api;
    constructor(config: GmCrudConfig, callVarNames: {
        createDto: string;
        updateDto: string;
        entity: string;
    });
    getPropertyName(): string;
    getDirName(): string;
    getFileName(): string;
    init(): void;
}
export {};

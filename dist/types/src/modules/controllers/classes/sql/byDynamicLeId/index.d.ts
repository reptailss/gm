import { GmCrudConfig } from "../../../../../os-core";
import { GmModuleAbstractControllerClass } from "../../abstract/GmModuleAbstractControllerClass";
import { IGmModuleClass } from "../../../../interfaces/gmModule";
export declare class GmModuleControllerClassCrudBySqlDynamicLeId extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmModuleCreateDto;
    private readonly gmModuleUpdateDto;
    private readonly gmAccessStructureMethodProcessorByDynamicLeId;
    constructor(config: GmCrudConfig);
    init(): void;
    private getValidatorCreateBodyVarName;
    private getValidatorUpdateBodyVarName;
    private getValidatorParamsDtoVarName;
    private getServiceVarName;
}
export declare class GmModuleControllerClassCreateBySqlDynamicLeId extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmModuleCreateDto;
    private readonly gmAccessStructureMethodProcessorByDynamicLeId;
    constructor(config: GmCrudConfig);
    init(): void;
    private getValidatorCreateBodyVarName;
    private getServiceVarName;
}
export declare class GmModuleControllerClassUpdateBySqlDynamicLeId extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmModuleUpdateDto;
    private readonly gmAccessStructureMethodProcessorByDynamicLeId;
    constructor(config: GmCrudConfig);
    init(): void;
    private getValidatorUpdateBodyVarName;
    private getServiceVarName;
}
export declare class GmModuleControllerClassDeleteBySqlDynamicLeId extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly serviceCrud;
    private readonly gmAccessStructureMethodProcessorByDynamicLeId;
    constructor(config: GmCrudConfig);
    init(): void;
    private getServiceVarName;
}
export declare class GmModuleControllerClassGetBySqlDynamicLeId extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly serviceCrud;
    private readonly gmAccessStructureMethodProcessorByDynamicLeId;
    constructor(config: GmCrudConfig);
    init(): void;
    private getServiceVarName;
}
export declare class GmModuleControllerClassGetAllBySqlDynamicLeId extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmAccessStructureMethodProcessorByDynamicLeId;
    constructor(config: GmCrudConfig);
    init(): void;
    private getValidatorParamsDtoVarName;
    private getServiceVarName;
}

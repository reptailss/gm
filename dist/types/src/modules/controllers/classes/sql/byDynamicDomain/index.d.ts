import { GmCrudConfig } from "../../../../../os-core";
import { IGmModuleClass } from "../../../../interfaces/gmModule";
import { GmModuleAbstractControllerClass } from "../../abstract/GmModuleAbstractControllerClass";
export declare class GmModuleControllerClassCrudBySqlDynamicDomain extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmAccessStructureMethodProcessorByDynamicDomain;
    constructor(config: GmCrudConfig);
    init(): void;
    private getValidatorCreateDtoVarName;
    private getValidatorUpdateDtoVarName;
    private getValidatorParamsDtoVarName;
    private getServiceVarName;
}
export declare class GmModuleControllerClassCreateBySqlDynamicDomain extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmAccessStructureMethodProcessorByDynamicDomain;
    constructor(config: GmCrudConfig);
    init(): void;
    private getValidatorCreateDtoVarName;
    private getServiceVarName;
}
export declare class GmModuleControllerClassUpdateBySqlDynamicDomain extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmAccessStructureMethodProcessorByDynamicDomain;
    constructor(config: GmCrudConfig);
    init(): void;
    private getValidatorUpdateDtoVarName;
    private getServiceVarName;
}
export declare class GmModuleControllerClassDeleteBySqlDynamicDomain extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly serviceCrud;
    private readonly gmAccessStructureMethodProcessorByDynamicDomain;
    constructor(config: GmCrudConfig);
    init(): void;
    private getServiceVarName;
}
export declare class GmModuleControllerClassGetBySqlDynamicDomain extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly serviceCrud;
    private readonly gmAccessStructureMethodProcessorByDynamicDomain;
    constructor(config: GmCrudConfig);
    init(): void;
    private getServiceVarName;
}
export declare class GmModuleControllerClassGetAllBySqlDynamicDomain extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmAccessStructureMethodProcessorByDynamicDomain;
    constructor(config: GmCrudConfig);
    init(): void;
    private getValidatorParamsDtoVarName;
    private getServiceVarName;
}

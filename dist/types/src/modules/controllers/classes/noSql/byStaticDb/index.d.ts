import { GmCrudConfig } from "../../../../../os-core";
import { IGmModuleClass } from "../../../../interfaces/gmModule";
import { GmModuleAbstractControllerClass } from "../../abstract/GmModuleAbstractControllerClass";
export declare class GmModuleControllerClassCrudByNoSqlStaticDb extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmGetVarNames;
    private readonly gmAccessStructureMethodProcessorByStaticDb;
    private readonly gmValidatorBuilder;
    constructor(config: GmCrudConfig);
    init(): void;
    private getServiceVarName;
}
export declare class GmModuleControllerClassCreateByNoSqlStaticDb extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmGetVarNames;
    private readonly gmAccessStructureMethodProcessorByStaticDb;
    private readonly gmValidatorBuilder;
    constructor(config: GmCrudConfig);
    init(): void;
    private getValidatorVarName;
    private getServiceVarName;
}
export declare class GmModuleControllerClassUpdateByNoSqlStaticDb extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmGetVarNames;
    private readonly gmAccessStructureMethodProcessorByStaticDb;
    private readonly gmValidatorBuilder;
    private readonly gmModuleUpdateDto;
    constructor(config: GmCrudConfig);
    init(): void;
    private getValidatorVarName;
    private getServiceVarName;
}
export declare class GmModuleControllerClassDeleteByNoSqlStaticDb extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly serviceCrud;
    private readonly gmGetVarNames;
    private readonly gmAccessStructureMethodProcessorByStaticDb;
    constructor(config: GmCrudConfig);
    init(): void;
    private getServiceVarName;
}
export declare class GmModuleControllerClassGetByNoSqlStaticDb extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly serviceCrud;
    private readonly gmGetVarNames;
    private readonly gmAccessStructureMethodProcessorByStaticDb;
    constructor(config: GmCrudConfig);
    init(): void;
    private getServiceVarName;
}
export declare class GmModuleControllerClassGetAllByNoSqlStaticDb extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmGetVarNames;
    private readonly gmAccessStructureMethodProcessorByStaticDb;
    private readonly gmValidatorBuilder;
    constructor(config: GmCrudConfig);
    init(): void;
    private getServiceVarName;
}

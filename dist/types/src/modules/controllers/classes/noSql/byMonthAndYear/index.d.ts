import { GmCrudConfig } from "../../../../../os-core";
import { IGmModuleClass } from "../../../../interfaces/gmModule";
import { GmModuleAbstractControllerClass } from "../../abstract/GmModuleAbstractControllerClass";
export declare class GmModuleControllerClassCrudByNoSqlMonthAndYear extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmServiceDateHelper;
    private readonly gmGetVarNames;
    private readonly gmAccessStructureMethodProcessorByMonthAndYear;
    private readonly gmValidatorBuilder;
    private readonly gmModuleCreateDto;
    constructor(config: GmCrudConfig);
    init(): void;
    private getServiceVarName;
}
export declare class GmModuleControllerClassCreateByNoSqlMonthAndYear extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmServiceDateHelper;
    private readonly gmGetVarNames;
    private readonly gmAccessStructureMethodProcessorByMonthAndYear;
    private readonly gmValidatorBuilder;
    private readonly gmModuleCreateDto;
    constructor(config: GmCrudConfig);
    init(): void;
    private getServiceVarName;
}
export declare class GmModuleControllerClassGetAllByNoSqlMonthAndYear extends GmModuleAbstractControllerClass implements IGmModuleClass {
    private readonly validator;
    private readonly serviceCrud;
    private readonly gmGetVarNames;
    private readonly gmAccessStructureMethodProcessorByMonthAndYear;
    private readonly gmValidatorBuilder;
    constructor(config: GmCrudConfig);
    init(): void;
    private getServiceVarName;
}

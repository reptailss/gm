import { GmModuleAbstractServiceClass } from "../abstract/GmModuleAbstractServiceClass";
import { IGmModuleClass, IGmModuleClassMethod } from "../../../interfaces/gmModule";
import { GmCrudConfig } from "../../../../os-core";
import { IGmModuleRepository } from "../../../repository/interfaces/gmModuleRepository";
export declare class GmModuleServiceClassByNoSqlMonthAndYear extends GmModuleAbstractServiceClass implements IGmModuleClass {
    private readonly repository;
    private readonly entityType;
    private readonly gmServiceDateHelper;
    constructor(config: GmCrudConfig, className: string);
    getModuleRepository(): IGmModuleRepository;
    addAndInitMethod(method: IGmModuleClassMethod, monthVarName: string, yearVarName: string): this;
    renderInitRepository(): string;
    init(): void;
}

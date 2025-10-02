import { GmModuleAbstractServiceClass } from "../abstract/GmModuleAbstractServiceClass";
import { IGmModuleClass, IGmModuleClassMethod } from "../../../interfaces/gmModule";
import { GmCrudConfig } from "../../../../os-core";
import { IGmModuleRepository } from "../../../repository/interfaces/gmModuleRepository";
export declare class GmModuleServiceClassByNoSqlMonthAndYear extends GmModuleAbstractServiceClass implements IGmModuleClass {
    private readonly gmModuleRepositoryByNoSqlMonthAndYear;
    constructor(config: GmCrudConfig, className: string);
    getModuleRepository(): IGmModuleRepository;
    getLoaderRepositoryVarName(): string;
    addAndInitMethod(method: IGmModuleClassMethod, monthVarName: string, yearVarName: string): this;
    renderInitRepository(): string;
    init(): void;
}

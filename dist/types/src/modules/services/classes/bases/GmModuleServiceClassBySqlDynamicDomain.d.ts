import { GmModuleAbstractServiceClass } from "../abstract/GmModuleAbstractServiceClass";
import { IGmModuleClass, IGmModuleClassMethod } from "../../../interfaces/gmModule";
import { GmCrudConfig } from "../../../../os-core";
import { IGmModuleRepository } from "../../../repository/interfaces/gmModuleRepository";
export declare class GmModuleServiceClassBySqlDynamicDomain extends GmModuleAbstractServiceClass implements IGmModuleClass {
    private readonly gmModuleRepositorySqlByDynamicDomain;
    constructor(config: GmCrudConfig, serviceName: string);
    getModuleRepository(): IGmModuleRepository;
    addAndInitMethod(method: IGmModuleClassMethod, domainVarName: string): this;
    init(): void;
}

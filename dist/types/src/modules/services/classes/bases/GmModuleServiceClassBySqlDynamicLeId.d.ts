import { GmModuleAbstractServiceClass } from "../abstract/GmModuleAbstractServiceClass";
import { IGmModuleClass, IGmModuleClassMethod } from "../../../interfaces/gmModule";
import { GmCrudConfig } from 'os-core-ts';
import { IGmModuleRepository } from "../../../repository/interfaces/gmModuleRepository";
export declare class GmModuleServiceClassBySqlDynamicLeId extends GmModuleAbstractServiceClass implements IGmModuleClass {
    private readonly gmModuleRepositorySqlByDynamicLeId;
    constructor(config: GmCrudConfig, serviceName: string);
    getModuleRepository(): IGmModuleRepository;
    addAndInitMethod(method: IGmModuleClassMethod, leIdVarName: string): this;
    init(): void;
}

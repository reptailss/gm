import { GmModuleAbstractServiceClass } from "../abstract/GmModuleAbstractServiceClass";
import { IGmModuleClass, IGmModuleClassMethod } from "../../../interfaces/gmModule";
import { GmConfig } from "../../../../config/types";
import { IGmModuleModel } from "../../../model/interfaces/gmModuleModel";
export declare class GmModuleServiceClassBySqlDynamicDomain extends GmModuleAbstractServiceClass implements IGmModuleClass {
    private readonly model;
    private readonly modelType;
    constructor(config: GmConfig, serviceName: string);
    getModuleModel(): IGmModuleModel;
    addAndInitMethod(method: IGmModuleClassMethod, domainVarName: string): this;
    init(): void;
}

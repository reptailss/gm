import { GmModuleAbstractServiceClass } from "../abstract/GmModuleAbstractServiceClass";
import { IGmModuleClass, IGmModuleClassMethod } from "../../../interfaces/gmModule";
import { GmConfig } from "../../../../os-core";
import { IGmModuleModel } from "../../../model/interfaces/gmModuleModel";
export declare class GmModuleServiceClassBySqlDynamicLeId extends GmModuleAbstractServiceClass implements IGmModuleClass {
    private readonly model;
    private readonly modelType;
    constructor(config: GmConfig, serviceName: string);
    getModuleModel(): IGmModuleModel;
    addAndInitMethod(method: IGmModuleClassMethod, leIdVarName: string): this;
    init(): void;
}

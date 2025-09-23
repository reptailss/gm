import { GmModuleAbstractServiceClass } from "../abstract/GmModuleAbstractServiceClass";
import { GmModuleServiceClass } from "../../interfaces/gmModuleServiceClassCurd";
import { GmConfig } from "../../../../os-core";
import { IGmModuleModel } from "../../../model/interfaces/gmModuleModel";
export declare class GmModuleServiceClassBySqlStaticDb extends GmModuleAbstractServiceClass implements GmModuleServiceClass {
    private readonly model;
    private readonly modelType;
    constructor(config: GmConfig, className: string);
    getModuleModel(): IGmModuleModel;
    init(): void;
}

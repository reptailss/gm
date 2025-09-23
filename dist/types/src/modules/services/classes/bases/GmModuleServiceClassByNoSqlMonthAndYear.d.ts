import { GmModuleAbstractServiceClass } from "../abstract/GmModuleAbstractServiceClass";
import { IGmModuleClass, IGmModuleClassMethod } from "../../../interfaces/gmModule";
import { GmConfig } from "../../../../config/types";
import { IGmModuleModel } from "../../../model/interfaces/gmModuleModel";
export declare class GmModuleServiceClassByNoSqlMonthAndYear extends GmModuleAbstractServiceClass implements IGmModuleClass {
    private readonly model;
    private readonly modelType;
    private readonly gmServiceDateHelper;
    constructor(config: GmConfig, className: string);
    getModuleModel(): IGmModuleModel;
    addAndInitMethod(method: IGmModuleClassMethod, monthVarName: string, yearVarName: string): this;
    renderInitModel(): string;
    init(): void;
}

import { GmAbstractModuleClassMethod } from "../../abstractModule/GmAbstractModuleClassMethod";
import { IGmModuleClassMethod } from "../../interfaces/gmModule";
import { GmServiceActionsLoggerService } from "../../../services/sendActionSystemLog/GmServiceActionsLoggerService";
import { IGmModuleRepository } from "../../repository/interfaces/gmModuleRepository";
import { GmCrudConfig } from "../../../os-core";
declare const PROPS_VAR_NAMES: {
    initiatorOpenUserId: string;
    createDto: string;
};
export declare class GmModuleServiceMethodCreate extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    private readonly gmModuleDto;
    private readonly gmModuleCreateDto;
    private readonly gmServiceThrowAppError;
    private readonly gmServiceSendActionSystemLog;
    private readonly gmModuleRepository;
    private readonly callVarNames;
    constructor(config: GmCrudConfig, gmModuleRepository: IGmModuleRepository, gmServiceSendActionSystemLog: GmServiceActionsLoggerService, callVarNames: typeof PROPS_VAR_NAMES);
    getPropertyName(): string;
    init(): void;
    private createRow;
    private getNewEntityPropertyVarName;
}
export {};

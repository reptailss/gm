import { GmAbstractModuleClassMethod } from "../../abstractModule/GmAbstractModuleClassMethod";
import { IGmModuleClassMethod } from "../../interfaces/gmModule";
import { GmServiceActionsLoggerService } from "../../../services/sendActionSystemLog/GmServiceActionsLoggerService";
import { IGmModuleRepository } from "../../repository/interfaces/gmModuleRepository";
import { GmCrudConfig } from "../../../os-core";
declare const PROPS_VAR_NAMES: {
    initiatorOpenUserId: string;
    updateDto: string;
    id: string;
};
export declare class GmModuleServiceMethodUpdate extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    private readonly gmModuleDto;
    private readonly gmModuleUpdateDto;
    private readonly gmServiceThrowAppError;
    private readonly gmServiceSendActionSystemLog;
    private readonly gmModuleRepository;
    private readonly callVarNames;
    constructor(config: GmCrudConfig, gmModuleRepository: IGmModuleRepository, gmServiceSendActionSystemLog: GmServiceActionsLoggerService, callVarNames: typeof PROPS_VAR_NAMES);
    getPropertyName(): string;
    init(): void;
    private checkHasRow;
    private updateRow;
    private getNewEntityVarName;
    private getOldDtoVarName;
}
export {};

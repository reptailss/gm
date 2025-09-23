import { GmConfig } from "../../os-core";
import { IGmModuleClassMethod } from "../interfaces/gmModule";
type CallVarNames = {
    openUserId: string;
    legalEntityId: string;
};
export declare class GmAccessStructureMethodProcessor {
    private readonly config;
    private readonly varNames;
    private readonly gmServiceStructureAccess;
    private readonly gmModuleRoutePaths;
    constructor(config: GmConfig, varNames: {
        add: CallVarNames;
        update: CallVarNames;
        delete: CallVarNames;
        get: CallVarNames;
        list: CallVarNames;
    });
    add(method: IGmModuleClassMethod): void;
    update(method: IGmModuleClassMethod): void;
    delete(method: IGmModuleClassMethod): void;
    get(method: IGmModuleClassMethod): void;
    list(method: IGmModuleClassMethod): void;
}
export {};

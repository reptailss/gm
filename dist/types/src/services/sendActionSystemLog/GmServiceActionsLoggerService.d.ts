import { GmAbstractServiceClass } from "../abstractService/GmAbstractServiceClass";
import { IGmServiceClass } from "../inetfaces/gmServiceClass";
import { GmModuleConstructorProp } from "../../modules/types";
import { GmExport } from "../../export/types";
export declare class GmServiceActionsLoggerService extends GmAbstractServiceClass implements IGmServiceClass {
    getServiceName(): string;
    getConstructorProp(): GmModuleConstructorProp;
    getExport(): GmExport;
    logCreateAction({ value, rowId, initiatorOpenUserId, config, }: {
        value: string;
        config: string;
        rowId: string;
        initiatorOpenUserId: string;
    }): string;
    logUpdateAction({ oldValue, newValue, config, rowId, initiatorOpenUserId, }: {
        oldValue: string;
        newValue: string;
        config: string;
        rowId: string;
        initiatorOpenUserId: string;
    }): string;
    logDeleteAction({ oldValue, initiatorOpenUserId, config, rowId, }: {
        oldValue: string;
        config: string;
        rowId: string;
        initiatorOpenUserId: string;
    }): string;
}

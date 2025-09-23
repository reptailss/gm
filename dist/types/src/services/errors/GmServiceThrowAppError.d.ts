import { GmAbstractServiceFn } from "../abstractService/GmAbstractServiceFn";
import { IGmService } from "../inetfaces/gmService";
import { GmExport } from "../../export/types";
export declare class GmServiceThrowAppError extends GmAbstractServiceFn implements IGmService {
    getServiceName(): string;
    getExport(): GmExport;
    throwAppError({ message, errorKey, ifConstruction, }: {
        message: string;
        errorKey: string;
        ifConstruction?: string;
    }): string;
}

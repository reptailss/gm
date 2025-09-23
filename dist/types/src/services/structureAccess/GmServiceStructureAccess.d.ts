import { GmAbstractServiceFn } from "../abstractService/GmAbstractServiceFn";
import { IGmService } from "../inetfaces/gmService";
import { GmExport } from "../../export/types";
export declare class GmServiceStructureAccess extends GmAbstractServiceFn implements IGmService {
    getServiceName(): string;
    getExport(): GmExport;
    checkAccess({ openUserIdVarName, endpointVarName, legalEntityIdVarName, }: {
        openUserIdVarName: string;
        legalEntityIdVarName: string;
        endpointVarName: string;
    }): string;
}

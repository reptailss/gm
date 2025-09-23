import { GmAbstractServiceFn } from "../abstractService/GmAbstractServiceFn";
import { IGmService } from "../inetfaces/gmService";
import { GmExport } from "../../export/types";
export declare class GmServiceBuildResponseFormat extends GmAbstractServiceFn implements IGmService {
    getServiceName(): string;
    getExport(): GmExport;
    mutateRow(idVarName: String): string;
    row(rowVarName: string): string;
    pagination(paginationVarName: string): string;
}

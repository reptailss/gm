import { GmAbstractServiceFn } from "../abstractService/GmAbstractServiceFn";
import { IGmService } from "../inetfaces/gmService";
import { GmExport } from "../../export/types";
export declare class GmServicePaginationNoSql extends GmAbstractServiceFn implements IGmService {
    getExport(): GmExport;
    getServiceName(): string;
    getPagination({ paramsVarName, dateStartVarName, dateEndVarName, getModelCbVarName, }: {
        paramsVarName: string;
        dateStartVarName: string;
        dateEndVarName: string;
        getModelCbVarName: string;
    }): string;
}

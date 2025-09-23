import { GmAbstractServiceFn } from "../abstractService/GmAbstractServiceFn";
import { IGmService } from "../inetfaces/gmService";
import { GmExport } from "../../export/types";
export declare class GmServicePaginationValuesType extends GmAbstractServiceFn implements IGmService {
    getExport(): GmExport;
    getServiceName(): string;
    getPaginationValuesType(dtoType: string): string;
}

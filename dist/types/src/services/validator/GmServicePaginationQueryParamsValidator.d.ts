import { IGmService } from "../inetfaces/gmService";
import { GmExport } from "../../export/types";
export declare class GmServicePaginationQueryParamsValidator implements IGmService {
    serviceType: "fn";
    getExport(): GmExport;
    getServiceName(): string;
    getSchema(dtoSchema: string): string;
}

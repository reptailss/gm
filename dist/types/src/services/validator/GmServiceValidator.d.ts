import { IGmService } from "../inetfaces/gmService";
import { GmExport } from "../../export/types";
export declare class GmServiceValidator implements IGmService {
    serviceType: "fn";
    getExport(): GmExport;
    getServiceName(): string;
    object(fields: Record<string, string>): string;
    string(min?: number, max?: number): string;
    number(min?: number, max?: number): string;
    date(): string;
    boolean(): string;
}

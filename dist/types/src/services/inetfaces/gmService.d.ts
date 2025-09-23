import { GmExport } from "../../export/types";
export interface IGmService {
    serviceType: 'fn' | 'class';
    getExport(): GmExport;
    getServiceName(): string;
}

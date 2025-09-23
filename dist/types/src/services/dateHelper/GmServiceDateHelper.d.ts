import { GmAbstractServiceFn } from "../abstractService/GmAbstractServiceFn";
import { IGmService } from "../inetfaces/gmService";
import { GmExport } from "../../export/types";
import { GmModuleConstructorProp } from "../../modules/types";
export declare class GmServiceDateHelper extends GmAbstractServiceFn implements IGmService {
    getServiceName(): string;
    getExport(): GmExport;
    getConstructorProp(): GmModuleConstructorProp | null;
    getCurrentMonth(): string;
    getCurrentYear(): string;
}

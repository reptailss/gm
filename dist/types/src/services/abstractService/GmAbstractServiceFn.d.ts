import { IGmServiceFn } from "../inetfaces/gmServiceFn";
import { GmExport } from "../../export/types";
export declare abstract class GmAbstractServiceFn implements IGmServiceFn {
    serviceType: "fn";
    abstract getServiceName(): string;
    abstract getExport(): GmExport;
}

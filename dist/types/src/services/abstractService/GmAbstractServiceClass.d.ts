import { IGmServiceClass } from "../inetfaces/gmServiceClass";
import { GmExport } from "../../export/types";
import { GmModuleConstructorProp } from "../../modules/types";
export declare abstract class GmAbstractServiceClass implements IGmServiceClass {
    serviceType: "class";
    abstract getServiceName(): string;
    abstract getExport(): GmExport;
    abstract getConstructorProp(): GmModuleConstructorProp;
}

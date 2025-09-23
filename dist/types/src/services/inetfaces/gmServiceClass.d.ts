import { GmModuleConstructorProp } from "../../modules/types";
import { IGmService } from "./gmService";
export interface IGmServiceClass extends IGmService {
    serviceType: 'class';
    getConstructorProp(): GmModuleConstructorProp;
}

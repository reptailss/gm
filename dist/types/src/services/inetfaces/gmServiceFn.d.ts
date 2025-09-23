import { IGmService } from "./gmService";
export interface IGmServiceFn extends IGmService {
    serviceType: 'fn';
}

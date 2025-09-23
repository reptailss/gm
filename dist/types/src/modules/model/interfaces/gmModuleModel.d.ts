import { IGmModule } from "../../interfaces/gmModule";
import { IGmModuleModelApi } from "./gmModuleModelApi";
export interface IGmModuleModel extends IGmModule {
    api: IGmModuleModelApi;
}

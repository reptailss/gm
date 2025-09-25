import { IGmModule } from "../../interfaces/gmModule";
import { IGmModuleRepositoryApi } from "./gmModuleRepositoryApi";
export interface IGmModuleRepository extends IGmModule {
    api: IGmModuleRepositoryApi;
}

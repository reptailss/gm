import { IGmModule } from "../modules/interfaces/gmModule";
import { IGmRenderModule } from "./interfaces/gmRenderModule";
export declare class GmRenderModule implements IGmRenderModule {
    private readonly module;
    constructor(module: IGmModule);
    renderPropertyName(): string;
}

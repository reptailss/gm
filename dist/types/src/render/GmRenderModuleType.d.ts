import { GmRenderModule } from "./GmRenderModule";
import { IGmRenderModuleType } from "./interfaces/gmRenderModuleType";
import { IGmModuleType } from "../modules/interfaces/gmModule";
export declare class GmRenderModuleType extends GmRenderModule implements IGmRenderModuleType {
    private readonly moduleType;
    private readonly gmRenderImports;
    constructor(moduleType: IGmModuleType);
    renderBody(): string;
    renderImports(): string;
    getData<T>(key: string): T;
    getExportMarkIfExported(): string;
}

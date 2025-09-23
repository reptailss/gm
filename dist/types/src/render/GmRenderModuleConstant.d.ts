import { GmRenderModule } from "./GmRenderModule";
import { IGmRenderModuleConstant } from "./interfaces/gmRenderModuleConstant";
import { IGmModuleConstant } from "../modules/interfaces/gmModule";
export declare class GmRenderModuleConstant extends GmRenderModule implements IGmRenderModuleConstant {
    private readonly moduleConstant;
    private readonly gmRenderImports;
    constructor(moduleConstant: IGmModuleConstant);
    renderImports(): string;
    renderBody(): string;
    renderType(): string;
    getData<T>(key: string): T;
    getExportMarkIfExported(): string;
}

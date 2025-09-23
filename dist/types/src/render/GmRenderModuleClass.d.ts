import { GmRenderModule } from "./GmRenderModule";
import { IGmRenderModuleClass } from "./interfaces/gmRenderModuleClass";
import { IGmModuleClass } from "../modules/interfaces/gmModule";
export declare class GmRenderModuleClass extends GmRenderModule implements IGmRenderModuleClass {
    private readonly moduleClass;
    private readonly gmRenderImports;
    constructor(moduleClass: IGmModuleClass);
    renderImports(): string;
    renderConstructorProps(): string;
    renderDecorators(): string;
    getExportMarkIfExported(): string;
    renderClass(): string;
    private renderElementsBeforeClass;
    private renderVars;
    private renderStringMethods;
}

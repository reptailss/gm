import { IGmRenderModule } from "./gmRenderModule";
export interface IGmRenderModuleType extends IGmRenderModule {
    renderBody(): string;
    getData<T>(key: string): T;
    getExportMarkIfExported(): string;
    renderImports(): string;
}

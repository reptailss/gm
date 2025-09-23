import { IGmRenderModule } from "./gmRenderModule";
export interface IGmRenderModuleFn extends IGmRenderModule {
    renderBody(): string;
    renderProps(): string;
    renderReturnType(): string;
    renderType(): string;
    renderAsyncType(): string;
    getData<T>(key: string): T;
    getExportMarkIfExported(): string;
    renderImports(): string;
}

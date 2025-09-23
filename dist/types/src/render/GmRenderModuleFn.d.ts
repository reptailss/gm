import { GmRenderModule } from "./GmRenderModule";
import { IGmRenderModuleFn } from "./interfaces/gmRenderModuleFn";
import { IGmModuleFn } from "../modules/interfaces/gmModule";
export declare class GmRenderModuleFn extends GmRenderModule implements IGmRenderModuleFn {
    private readonly moduleFn;
    private readonly gmRenderImports;
    constructor(moduleFn: IGmModuleFn);
    renderImports(): string;
    renderBody(): string;
    renderReturnType(): string;
    renderType(): string;
    getData<T>(key: string): T;
    renderProps(): string;
    getExportMarkIfExported(): string;
    renderAsyncType(): "" | "async";
    private renderDefaultPropsType;
    private renderObjectPropsType;
}

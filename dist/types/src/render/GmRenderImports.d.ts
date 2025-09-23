import { IGmModule } from "../modules/interfaces/gmModule";
export declare class GmRenderImports {
    private readonly module;
    constructor(module: IGmModule);
    renderImports(): string;
    private renderImportGroup;
    private getNormalizeImportPath;
}

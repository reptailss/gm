import { IGmModule } from "../modules/interfaces/gmModule";
export declare class GmCreateFile {
    private module;
    private readonly gmCodeBuilder;
    constructor(module: IGmModule);
    run(): void;
    private writeModule;
    private checkIsClassModule;
    private checkIsWriteModule;
    private getDataByModule;
    private getBasePath;
    private getOutputPath;
    private markModuleAsWritten;
    private isModuleWritten;
    private createChildModules;
    private checkAndCreateFolder;
    private writeFileModule;
    private saveFile;
    private appendFileModule;
    private combineAndOptimizeImports;
}

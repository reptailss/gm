import { GmConfig } from "../../config/types";
import { IGmModule, IGmModuleClass, IGmModuleConstant, IGmModuleFn, IGmModuleType } from "../interfaces/gmModule";
import { GmImport } from "../../imports/types";
import { GmModuleDirType, GmModuleParentInfo } from "../types";
import { IGmService } from "../../services/inetfaces/gmService";
export declare abstract class GmAbstractModule implements IGmModule {
    private config;
    private childModules;
    private modules;
    private importsModules;
    private parentInfo;
    constructor(config: GmConfig);
    abstract moduleType: 'constant' | 'class' | 'classMethod' | 'fn' | 'type';
    abstract getPropertyName(): string;
    abstract getTemplatePath(): string;
    abstract init(): void;
    getConfig(): GmConfig;
    getRootModuleDirName(): string;
    addService(service: IGmService): this;
    addModule(module: IGmModuleFn | IGmModuleConstant | IGmModuleType | IGmModuleClass, options?: {
        hasAddImport?: boolean;
    }): this;
    getModules(): IGmModule[];
    addChildModule(module: IGmModuleFn | IGmModuleConstant | IGmModuleType | IGmModuleClass): this;
    getChildModules(): IGmModule[];
    addImport(data: GmImport, dirType?: GmModuleDirType): this;
    getImports(): GmImport[];
    setParentInfo(info: GmModuleParentInfo): this;
    getParentInfo(): GmModuleParentInfo | null;
}

import { GmAbstractModuleConstant } from "../abstractModule/GmAbstractModuleConstant";
import { IGmModuleConstant } from "../interfaces/gmModule";
import { GmFileWriteMode } from "../types";
import { GmCrudConfig } from "../../os-core";
export declare class GmModuleConstants extends GmAbstractModuleConstant implements IGmModuleConstant {
    private value;
    private mode;
    private propertyName;
    private hasDir;
    private fileName;
    constructor({ config, value, propertyName, hasDir, fileName, mode, }: {
        config: GmCrudConfig;
        value: string;
        propertyName: string;
        hasDir?: boolean;
        fileName?: string;
        mode?: GmFileWriteMode;
    });
    getPropertyName(): string;
    getDirName(): string | null;
    getFileName(): string;
    init(): void;
}

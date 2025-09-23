import { GmAbstractModuleClass } from "../abstractModule/GmAbstractModuleClass";
import { IGmModuleClass } from "../interfaces/gmModule";
import { GmConfig } from "../../config/types";
export declare class GmModuleValidator extends GmAbstractModuleClass implements IGmModuleClass {
    private readonly schemaVarName;
    constructor(config: GmConfig, schemaVarName: string);
    getPropertyName(): string;
    getDirName(): string | null;
    getFileName(): string;
    init(): void;
    api: {
        getCreateDtoSchema: () => string;
        getUpdateDtoSchema: () => string;
        getDtoPaginationQueryParamsSchema: () => string;
    };
}

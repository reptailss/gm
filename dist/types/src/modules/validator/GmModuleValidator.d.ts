import { GmAbstractModuleClass } from "../abstractModule/GmAbstractModuleClass";
import { IGmModuleClass } from "../interfaces/gmModule";
import { GmCrudConfig } from "../../os-core";
export declare class GmModuleValidator extends GmAbstractModuleClass implements IGmModuleClass {
    private readonly schemaVarName;
    constructor(config: GmCrudConfig, schemaVarName: string);
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

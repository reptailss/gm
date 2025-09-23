import { IGmModuleClassMethodDecorator } from "../interfaces/gmModuleClassMethodDecorator";
import { GmImport } from "../../imports/types";
export declare class GmPaginationQueryParamsDec implements IGmModuleClassMethodDecorator {
    private readonly schemaVarName;
    constructor(schemaVarName: string);
    getDecoratorName(): string;
    getProps(): string[];
    getImport(): GmImport;
}

import { IGmModuleClassMethodPropDecorator } from "../interfaces/gmModuleClassMethodPropDecorator";
import { GmImport } from "../../imports/types";
export declare class GmBodyDec implements IGmModuleClassMethodPropDecorator {
    private readonly schemaVarName;
    constructor(schemaVarName: string);
    getDecoratorName(): string;
    getProps(): string[];
    getImport(): GmImport;
}

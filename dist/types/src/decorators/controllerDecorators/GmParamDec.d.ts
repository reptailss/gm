import { IGmModuleClassMethodPropDecorator } from "../interfaces/gmModuleClassMethodPropDecorator";
import { GmImport } from "../../imports/types";
export declare class GmParamNumDec implements IGmModuleClassMethodPropDecorator {
    private readonly key;
    constructor(key: string);
    getDecoratorName(): string;
    getProps(): string[];
    getImport(): GmImport;
}
export declare class GmParamDec implements IGmModuleClassMethodPropDecorator {
    private readonly key;
    constructor(key: string);
    getDecoratorName(): string;
    getProps(): string[];
    getImport(): GmImport;
}

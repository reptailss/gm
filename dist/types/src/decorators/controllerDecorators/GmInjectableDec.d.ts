import { IGmModuleClassMethodPropDecorator } from "../interfaces/gmModuleClassMethodPropDecorator";
import { GmImport } from "../../imports/types";
export declare class GmInjectableDec implements IGmModuleClassMethodPropDecorator {
    getDecoratorName(): string;
    getProps(): string[];
    getImport(): GmImport;
}

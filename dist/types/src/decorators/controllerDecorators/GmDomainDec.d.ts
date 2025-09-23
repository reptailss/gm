import { IGmModuleClassMethodDecorator } from "../interfaces/gmModuleClassMethodDecorator";
import { GmImport } from "../../imports/types";
export declare class GmDomainDec implements IGmModuleClassMethodDecorator {
    getDecoratorName(): string;
    getProps(): string[];
    getImport(): GmImport;
}

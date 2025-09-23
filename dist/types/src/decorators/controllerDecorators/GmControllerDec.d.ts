import { IGmModuleClassDecorator } from "../interfaces/gmModuleClassDecorator";
import { GmImport } from "../../imports/types";
export declare class GmControllerDec implements IGmModuleClassDecorator {
    getDecoratorName(): string;
    getProps(): string[];
    getImport(): GmImport;
}

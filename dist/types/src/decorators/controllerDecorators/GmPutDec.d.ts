import { IGmModuleClassMethodDecorator } from "../interfaces/gmModuleClassMethodDecorator";
import { GmImport } from "../../imports/types";
export declare class GmPutDec implements IGmModuleClassMethodDecorator {
    private readonly url;
    constructor(url: string);
    getDecoratorName(): string;
    getProps(): string[];
    getImport(): GmImport;
}

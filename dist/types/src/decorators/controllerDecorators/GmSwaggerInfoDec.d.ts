import { IGmModuleClassMethodDecorator } from "../interfaces/gmModuleClassMethodDecorator";
import { GmImport } from "../../imports/types";
export declare class GmSwaggerInfoDec implements IGmModuleClassMethodDecorator {
    private readonly summary;
    constructor(summary: string);
    getDecoratorName(): string;
    getProps(): string[];
    getImport(): GmImport;
}

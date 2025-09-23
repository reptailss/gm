import { IGmModuleClassMethodDecorator } from "../interfaces/gmModuleClassMethodDecorator";
import { GmImport } from "../../imports/types";
export declare class GmImportStructureServiceEndpointDec implements IGmModuleClassMethodDecorator {
    private readonly name;
    constructor(name: string);
    getDecoratorName(): string;
    getProps(): string[];
    getImport(): GmImport;
}

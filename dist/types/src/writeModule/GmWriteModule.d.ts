import { IGmModule } from "../modules/interfaces/gmModule";
export declare class GmWriteModule {
    private readonly gmCreateFile;
    constructor(module: IGmModule);
    run(): void;
}

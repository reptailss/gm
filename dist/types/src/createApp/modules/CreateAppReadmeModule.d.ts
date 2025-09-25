import { CreateAppConfig } from "../config/types";
export declare class CreateAppReadmeModule {
    private readonly packageName;
    private readonly config;
    constructor(packageName: string, config: CreateAppConfig);
    create(): void;
}

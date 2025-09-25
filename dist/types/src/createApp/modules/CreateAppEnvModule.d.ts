import { CreateAppConfig } from "../config/types";
export declare class CreateAppEnvModule {
    private readonly packageName;
    private readonly config;
    constructor(packageName: string, config: CreateAppConfig);
    create(): void;
    private getEnvValue;
}

import { CreateAppConfig } from "../config/types";
export declare class CreateAppPackageJsonModule {
    private readonly packageName;
    private readonly config;
    constructor(packageName: string, config: CreateAppConfig);
    create(): void;
}

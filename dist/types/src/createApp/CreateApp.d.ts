import { CreateAppConfig } from "./config/types";
export declare class CreateApp {
    private readonly packageName;
    private readonly createAppPackageJsonModule;
    private readonly createAppTsConfigModule;
    private readonly createAppReadmeModule;
    private readonly createAppSwaggerConfigModule;
    private readonly createAppGCrudConfigModule;
    private readonly createAppPipelinesModule;
    private readonly createAppDockerfileModule;
    private readonly createAppPrettierrcConfigModule;
    private readonly createAppGitignoreModule;
    private readonly createAppEnvModule;
    private readonly createAppDockerignoreModule;
    private readonly createAppModule;
    private readonly createAppIndexModule;
    constructor(packageName: string, config: CreateAppConfig);
    run(): Promise<void>;
    private createPackageDir;
}

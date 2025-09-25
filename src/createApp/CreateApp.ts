import {CreateAppPackageJsonModule} from './modules/CreateAppPackageJsonModule'
import fs from 'fs'
import path from 'path'
import {CreateAppReadmeModule} from '@createApp/modules/CreateAppReadmeModule'
import {CreateAppTsConfigModule} from '@createApp/modules/CreateAppTsConfigModule'
import {CreateAppSwaggerConfigModule} from '@createApp/modules/CreateAppSwaggerConfigModule'
import {CreateAppGCrudConfigModule} from '@createApp/modules/CreateAppGCrudConfigModule'
import {CreateAppPipelinesModule} from '@createApp/modules/CreateAppPipelinesModule'
import {CreateAppDockerfileModule} from '@createApp/modules/CreateAppDockerfileModule'
import {CreateAppPrettierrcConfigModule} from '@createApp/modules/CreateAppPrettierrcConfigModule'
import {CreateAppGitignoreModule} from '@createApp/modules/CreateAppGitignoreModule'
import {CreateAppEnvModule} from '@createApp/modules/CreateAppEnvModule'
import {CreateAppDockerignoreModule} from '@createApp/modules/CreateAppDockerignoreModule'
import {CreateAppIndexModule} from '@createApp/modules/CreateAppIndexModule'
import {CreateAppModule} from '@createApp/modules/CreateAppModule'
import {CreateAppConfig} from '@createApp/config/types'

export class CreateApp {
    private readonly createAppPackageJsonModule: CreateAppPackageJsonModule
    private readonly createAppTsConfigModule: CreateAppTsConfigModule
    private readonly createAppReadmeModule: CreateAppReadmeModule
    private readonly createAppSwaggerConfigModule: CreateAppSwaggerConfigModule
    private readonly createAppGCrudConfigModule: CreateAppGCrudConfigModule
    private readonly createAppPipelinesModule: CreateAppPipelinesModule
    private readonly createAppDockerfileModule: CreateAppDockerfileModule
    private readonly createAppPrettierrcConfigModule: CreateAppPrettierrcConfigModule
    private readonly createAppGitignoreModule: CreateAppGitignoreModule
    private readonly createAppEnvModule: CreateAppEnvModule
    private readonly createAppDockerignoreModule: CreateAppDockerignoreModule
    private readonly createAppModule: CreateAppModule
    private readonly createAppIndexModule: CreateAppIndexModule
    
    constructor(private readonly packageName: string, config: CreateAppConfig) {
        this.createAppPackageJsonModule = new CreateAppPackageJsonModule(packageName,config)
        this.createAppTsConfigModule = new CreateAppTsConfigModule(packageName)
        this.createAppReadmeModule = new CreateAppReadmeModule(packageName, config)
        this.createAppSwaggerConfigModule = new CreateAppSwaggerConfigModule(packageName)
        this.createAppGCrudConfigModule = new CreateAppGCrudConfigModule(packageName)
        this.createAppPipelinesModule = new CreateAppPipelinesModule(packageName)
        this.createAppDockerfileModule = new CreateAppDockerfileModule(packageName)
        this.createAppPrettierrcConfigModule = new CreateAppPrettierrcConfigModule(packageName)
        this.createAppGitignoreModule = new CreateAppGitignoreModule(packageName)
        this.createAppEnvModule = new CreateAppEnvModule(packageName, config)
        this.createAppDockerignoreModule = new CreateAppDockerignoreModule(packageName)
        this.createAppModule = new CreateAppModule(packageName)
        this.createAppIndexModule = new CreateAppIndexModule(packageName)
    }
    
    
    public async run(): Promise<void> {
        this.createPackageDir()
        this.createAppPackageJsonModule.create()
        this.createAppTsConfigModule.create()
        this.createAppReadmeModule.create()
        this.createAppSwaggerConfigModule.create()
        this.createAppGCrudConfigModule.create()
        this.createAppPipelinesModule.create()
        this.createAppDockerfileModule.create()
        this.createAppPrettierrcConfigModule.create()
        this.createAppGitignoreModule.create()
        this.createAppEnvModule.create()
        this.createAppDockerignoreModule.create()
        this.createAppDockerignoreModule.create()
        this.createAppModule.create()
        this.createAppIndexModule.create()
        
    }
    
    
    private createPackageDir() {
        const rootDir = process.cwd()
        const packageDir = path.join(rootDir, this.packageName)
        
        if (fs.existsSync(packageDir)) {
            throw new Error(`Folder "${this.packageName}" already exists ${rootDir}`)
        }
        fs.mkdirSync(packageDir, {recursive: true})
        fs.mkdirSync(path.join(packageDir, 'src'), {recursive: true})
    }
}
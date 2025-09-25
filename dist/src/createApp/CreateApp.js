"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateApp = void 0;
const CreateAppPackageJsonModule_1 = require("./modules/CreateAppPackageJsonModule");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const CreateAppReadmeModule_1 = require("./modules/CreateAppReadmeModule");
const CreateAppTsConfigModule_1 = require("./modules/CreateAppTsConfigModule");
const CreateAppSwaggerConfigModule_1 = require("./modules/CreateAppSwaggerConfigModule");
const CreateAppGCrudConfigModule_1 = require("./modules/CreateAppGCrudConfigModule");
const CreateAppPipelinesModule_1 = require("./modules/CreateAppPipelinesModule");
const CreateAppDockerfileModule_1 = require("./modules/CreateAppDockerfileModule");
const CreateAppPrettierrcConfigModule_1 = require("./modules/CreateAppPrettierrcConfigModule");
const CreateAppGitignoreModule_1 = require("./modules/CreateAppGitignoreModule");
const CreateAppEnvModule_1 = require("./modules/CreateAppEnvModule");
const CreateAppDockerignoreModule_1 = require("./modules/CreateAppDockerignoreModule");
const CreateAppIndexModule_1 = require("./modules/CreateAppIndexModule");
const CreateAppModule_1 = require("./modules/CreateAppModule");
class CreateApp {
    constructor(packageName, config) {
        this.packageName = packageName;
        this.createAppPackageJsonModule = new CreateAppPackageJsonModule_1.CreateAppPackageJsonModule(packageName, config);
        this.createAppTsConfigModule = new CreateAppTsConfigModule_1.CreateAppTsConfigModule(packageName);
        this.createAppReadmeModule = new CreateAppReadmeModule_1.CreateAppReadmeModule(packageName, config);
        this.createAppSwaggerConfigModule = new CreateAppSwaggerConfigModule_1.CreateAppSwaggerConfigModule(packageName);
        this.createAppGCrudConfigModule = new CreateAppGCrudConfigModule_1.CreateAppGCrudConfigModule(packageName);
        this.createAppPipelinesModule = new CreateAppPipelinesModule_1.CreateAppPipelinesModule(packageName);
        this.createAppDockerfileModule = new CreateAppDockerfileModule_1.CreateAppDockerfileModule(packageName);
        this.createAppPrettierrcConfigModule = new CreateAppPrettierrcConfigModule_1.CreateAppPrettierrcConfigModule(packageName);
        this.createAppGitignoreModule = new CreateAppGitignoreModule_1.CreateAppGitignoreModule(packageName);
        this.createAppEnvModule = new CreateAppEnvModule_1.CreateAppEnvModule(packageName, config);
        this.createAppDockerignoreModule = new CreateAppDockerignoreModule_1.CreateAppDockerignoreModule(packageName);
        this.createAppModule = new CreateAppModule_1.CreateAppModule(packageName);
        this.createAppIndexModule = new CreateAppIndexModule_1.CreateAppIndexModule(packageName);
    }
    async run() {
        this.createPackageDir();
        this.createAppPackageJsonModule.create();
        this.createAppTsConfigModule.create();
        this.createAppReadmeModule.create();
        this.createAppSwaggerConfigModule.create();
        this.createAppGCrudConfigModule.create();
        this.createAppPipelinesModule.create();
        this.createAppDockerfileModule.create();
        this.createAppPrettierrcConfigModule.create();
        this.createAppGitignoreModule.create();
        this.createAppEnvModule.create();
        this.createAppDockerignoreModule.create();
        this.createAppDockerignoreModule.create();
        this.createAppModule.create();
        this.createAppIndexModule.create();
    }
    createPackageDir() {
        const rootDir = process.cwd();
        const packageDir = path_1.default.join(rootDir, this.packageName);
        if (fs_1.default.existsSync(packageDir)) {
            throw new Error(`Folder "${this.packageName}" already exists ${rootDir}`);
        }
        fs_1.default.mkdirSync(packageDir, { recursive: true });
        fs_1.default.mkdirSync(path_1.default.join(packageDir, 'src'), { recursive: true });
    }
}
exports.CreateApp = CreateApp;
//# sourceMappingURL=CreateApp.js.map
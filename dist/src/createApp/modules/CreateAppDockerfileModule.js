"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppDockerfileModule = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const StringCaseHelper_1 = require("../../helpers/StringCaseHelper");
class CreateAppDockerfileModule {
    constructor(packageName) {
        this.packageName = packageName;
    }
    create() {
        const rootDir = process.cwd();
        const packageJsonPath = path_1.default.join(rootDir, this.packageName, 'Dockerfile');
        const content = `
FROM node:20-alpine
RUN apk add --no-cache git
WORKDIR /${StringCaseHelper_1.StringCaseHelper.toSnakeCase(this.packageName)}
COPY package.json  /${StringCaseHelper_1.StringCaseHelper.toSnakeCase(this.packageName)}
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "app"]
        `;
        fs_1.default.writeFileSync(packageJsonPath, content, {
            encoding: 'utf-8',
        });
    }
}
exports.CreateAppDockerfileModule = CreateAppDockerfileModule;
//# sourceMappingURL=CreateAppDockerfileModule.js.map
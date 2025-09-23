"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmRootHathHelper = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class GmRootHathHelper {
    static findNearestPackageJson(startDir = process.cwd()) {
        let currentDir = path_1.default.resolve(startDir);
        while (true) {
            const pkgPath = path_1.default.join(currentDir, 'package.json');
            if (fs_1.default.existsSync(pkgPath)) {
                return currentDir;
            }
            const parentDir = path_1.default.dirname(currentDir);
            if (parentDir === currentDir) {
                return null;
            }
            currentDir = parentDir;
        }
    }
}
exports.GmRootHathHelper = GmRootHathHelper;
//# sourceMappingURL=GmRootHathHelper.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleAppModule = void 0;
const GmAbstractModuleConstant_1 = require("../abstractModule/GmAbstractModuleConstant");
const StringCaseHelper_1 = require("../../helpers/StringCaseHelper");
class GmModuleAppModule extends GmAbstractModuleConstant_1.GmAbstractModuleConstant {
    constructor(config, controllers) {
        super(config);
        this.controllers = controllers;
    }
    getPropertyName() {
        return `${StringCaseHelper_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}AppModule`;
    }
    getDirName() {
        return '/';
    }
    getFileName() {
        return `${this.getPropertyName()}.ts`;
    }
    init() {
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'AppModule',
            isLibImport: true,
        });
        const controllersName = [];
        if (this.controllers.length) {
            this.controllers.forEach((controller) => {
                const exportProp = controller.getExport();
                if (exportProp) {
                    this.addImport(exportProp);
                }
                controllersName.push(controller.getPropertyName());
            });
        }
        const tag = StringCaseHelper_1.StringCaseHelper.toKebabCase(this.getConfig().dtoName.plural);
        this.setBody(`
        new AppModule({
            controllers: [${controllersName.join(',')}],
            swaggerInfo:{
                tag:'${tag.charAt(0).toUpperCase() + tag.slice(1)}'
            }
        })`);
    }
}
exports.GmModuleAppModule = GmModuleAppModule;
//# sourceMappingURL=GmModuleAppModule.js.map
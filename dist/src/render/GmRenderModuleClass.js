"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmRenderModuleClass = void 0;
const GmRenderModule_1 = require("./GmRenderModule");
const GmRenderImports_1 = require("./GmRenderImports");
const GmRenderModuleClassMethod_1 = require("./GmRenderModuleClassMethod");
class GmRenderModuleClass extends GmRenderModule_1.GmRenderModule {
    constructor(moduleClass) {
        super(moduleClass);
        this.moduleClass = moduleClass;
        this.gmRenderImports = new GmRenderImports_1.GmRenderImports(moduleClass);
    }
    renderImports() {
        return this.gmRenderImports.renderImports();
    }
    renderConstructorProps() {
        var _a, _b;
        if (!((_a = this.moduleClass.getConstructorProps()) === null || _a === void 0 ? void 0 : _a.length)) {
            return '';
        }
        return (_b = this.moduleClass.getConstructorProps().map((prop) => {
            const varName = prop.optional ? `${prop.varName}?` : prop.varName;
            const type = prop.nullable ? `${prop.type} | null` : prop.type;
            const defaultValue = prop.defaultValue ? ` = ${prop.defaultValue}` : '';
            if (prop.privateReadOnly) {
                return `private readonly ${varName}:${type}${defaultValue}`;
            }
            return `${varName}:${type}${defaultValue}`;
        })) === null || _b === void 0 ? void 0 : _b.join(',');
    }
    renderDecorators() {
        var _a;
        return (_a = this.moduleClass.getDecorators().map((decorator) => {
            if (!decorator.getProps().length) {
                return `@${decorator.getDecoratorName()}`;
            }
            return `@${decorator.getDecoratorName()}(${decorator.getProps().join(',')})`;
        })) === null || _a === void 0 ? void 0 : _a.join('\n');
    }
    getExportMarkIfExported() {
        if (this.moduleClass.getExport()) {
            return 'export';
        }
        return '';
    }
    renderClass() {
        return `
        ${this.renderImports()}
        
        ${this.renderElementsBeforeClass()}
        
        ${this.renderDecorators()}
        ${this.getExportMarkIfExported()} class ${this.renderPropertyName()} {
            \n
            constructor(${this.renderConstructorProps()}){}
             \n
             \n
             ${this.renderVars()}
               \n
            ${this.renderStringMethods()}
        }
        `;
    }
    renderElementsBeforeClass() {
        if (!this.moduleClass.getElementsBeforeClass().length) {
            return '';
        }
        return this.moduleClass.getElementsBeforeClass().join('\n');
    }
    renderVars() {
        if (!this.moduleClass.getVars().length) {
            return '';
        }
        return this.moduleClass.getVars().map((gmVar) => {
            const readonly = gmVar.readonly ? 'readonly' : '';
            const defaultValue = gmVar.defaultValue ? ` = ${gmVar.defaultValue}` : '';
            const type = gmVar.type ? ` :${gmVar.type}` : '';
            return `${gmVar.scope} ${readonly} ${gmVar.varName} ${type}${defaultValue}`;
        }).join('\n');
    }
    renderStringMethods() {
        if (!this.moduleClass.getMethods().length) {
            return '';
        }
        return this.moduleClass.getMethods().map((method) => {
            const gmRenderModuleClassMethod = new GmRenderModuleClassMethod_1.GmRenderModuleClassMethod(method);
            return `
            ${gmRenderModuleClassMethod.renderDecorators()}
            ${gmRenderModuleClassMethod.renderScope()} ${gmRenderModuleClassMethod.renderAsyncType()} ${gmRenderModuleClassMethod.renderPropertyName()} (${gmRenderModuleClassMethod.renderProps()}) ${gmRenderModuleClassMethod.renderReturnType()}{
                ${gmRenderModuleClassMethod.renderBody()}
           }
            `;
        }).join('\n\n');
    }
}
exports.GmRenderModuleClass = GmRenderModuleClass;
//# sourceMappingURL=GmRenderModuleClass.js.map
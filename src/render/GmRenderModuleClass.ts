import {GmRenderModule} from '@render/GmRenderModule'
import {IGmRenderModuleClass} from '@render/interfaces/gmRenderModuleClass'
import {IGmModuleClass} from '@modules/interfaces/gmModule'
import {GmRenderImports} from '@render/GmRenderImports'
import {GmRenderModuleClassMethod} from '@render/GmRenderModuleClassMethod'


export class GmRenderModuleClass extends GmRenderModule implements IGmRenderModuleClass {
    
    private readonly moduleClass: IGmModuleClass
    private readonly gmRenderImports: GmRenderImports
    
    constructor(moduleClass: IGmModuleClass) {
        super(moduleClass)
        this.moduleClass = moduleClass
        this.gmRenderImports = new GmRenderImports(moduleClass)
        
    }
    
    public renderImports(): string {
        return this.gmRenderImports.renderImports()
    }
    
    public renderConstructorProps(): string {
        if (!this.moduleClass.getConstructorProps()?.length) {
            return ''
        }
        return this.moduleClass.getConstructorProps().map((prop) => {
            const varName = prop.optional ? `${prop.varName}?` : prop.varName
            const type = prop.nullable ? `${prop.type} | null` : prop.type
            const defaultValue = prop.defaultValue ? ` = ${prop.defaultValue}` : ''
            if (prop.privateReadOnly) {
                return `private readonly ${varName}:${type}${defaultValue}`
            }
            return `${varName}:${type}${defaultValue}`
        })?.join(',')
    }
    
    
    public renderDecorators(): string {
        return this.moduleClass.getDecorators().map((decorator) => {
            
            if (!decorator.getProps().length) {
                return `@${decorator.getDecoratorName()}`
            }
            
            return `@${decorator.getDecoratorName()}(${decorator.getProps().join(',')})`
        })?.join('\n')
    }
    
    public getExportMarkIfExported(): string {
        if (this.moduleClass.getExport()) {
            return 'export'
        }
        return ''
    }
    
    public renderClass() {
        const constructorProps = this.renderConstructorProps()
        const constructor = constructorProps ? `constructor(${constructorProps}){}` : ''
        return `
        ${this.renderImports()}
        
        ${this.renderElementsBeforeClass()}
        
        ${this.renderDecorators()}
        ${this.getExportMarkIfExported()} class ${this.renderPropertyName()} {
            \n
            ${constructor}
             \n
             \n
             ${this.renderVars()}
               \n
            ${this.renderStringMethods()}
        }
        `
    }
    
    private renderElementsBeforeClass(): string {
        if (!this.moduleClass.getElementsBeforeClass().length) {
            return ''
        }
        return this.moduleClass.getElementsBeforeClass().join('\n')
    }
    
    private renderVars(): string {
        if (!this.moduleClass.getVars().length) {
            return ''
        }
        return this.moduleClass.getVars().map((gmVar) => {
            const readonly = gmVar.readonly ? 'readonly' : ''
            const defaultValue = gmVar.defaultValue ? ` = ${gmVar.defaultValue}` : ''
            const type = gmVar.type ? ` :${gmVar.type}` : ''
            if (gmVar.decorator) {
                if(!gmVar.decorator.getProps().length){
                    return `
                    @${gmVar.decorator.getDecoratorName()}
                     ${gmVar.scope} ${readonly} ${gmVar.varName} ${type}${defaultValue}
                    `
                }
                return `@${gmVar.decorator.getDecoratorName()}(${gmVar.decorator.getProps().join(',')})
                ${gmVar.scope} ${readonly} ${gmVar.varName} ${type}${defaultValue}
                `
            }
            return `${gmVar.scope} ${readonly} ${gmVar.varName} ${type}${defaultValue}`
        }).join('\n')
    }
    
    private renderStringMethods() {
        if (!this.moduleClass.getMethods().length) {
            return ''
        }
        return this.moduleClass.getMethods().map((method) => {
            const gmRenderModuleClassMethod = new GmRenderModuleClassMethod(method)
            
            return `
            ${gmRenderModuleClassMethod.renderDecorators()}
            ${gmRenderModuleClassMethod.renderScope()} ${gmRenderModuleClassMethod.renderAsyncType()} ${gmRenderModuleClassMethod.renderPropertyName()} (${gmRenderModuleClassMethod.renderProps()}) ${gmRenderModuleClassMethod.renderReturnType()}{
                ${gmRenderModuleClassMethod.renderBody()}
           }
            `
        }).join('\n\n')
    }
    
    
}
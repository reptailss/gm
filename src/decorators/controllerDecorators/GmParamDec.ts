import {IGmModuleClassMethodPropDecorator} from '@decorators/interfaces/gmModuleClassMethodPropDecorator'
import {GmImport} from '@imports/types'


export class GmParamNumDec implements IGmModuleClassMethodPropDecorator {

    constructor(private readonly key: string) {
    }

    public getDecoratorName(): string {
        return 'ParamNum'
    }

    public getProps(): string[] {
        return [`'${this.key}'`]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'ParamNum',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}


export class GmParamDec implements IGmModuleClassMethodPropDecorator {

    constructor(private readonly key: string) {
    }

    public getDecoratorName(): string {
        return 'Param'
    }

    public getProps(): string[] {
        return [`'${this.key}'`]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'Param',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}

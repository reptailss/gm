import {IGmModuleClassMethodPropDecorator} from '@decorators/interfaces/gmModuleClassMethodPropDecorator'
import {GmImport} from '@imports/types'


export class GmParamNumDec implements IGmModuleClassMethodPropDecorator {

    constructor(private readonly key: string) {
    }

    public getDecoratorName(): string {
        return 'ParamNumDec'
    }

    public getProps(): string[] {
        return [`'${this.key}'`]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'ParamNumDec',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}


export class GmParamDec implements IGmModuleClassMethodPropDecorator {

    constructor(private readonly key: string) {
    }

    public getDecoratorName(): string {
        return 'ParamDec'
    }

    public getProps(): string[] {
        return [`'${this.key}'`]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'ParamDec',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}

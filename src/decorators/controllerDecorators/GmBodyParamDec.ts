import {IGmModuleClassMethodPropDecorator} from '@decorators/interfaces/gmModuleClassMethodPropDecorator'
import {GmImport} from '@imports/types'


export class GmBodyParamNumDec implements IGmModuleClassMethodPropDecorator {

    constructor(private readonly key: string) {
    }

    public getDecoratorName(): string {
        return 'BodyParamNumDec'
    }

    public getProps(): string[] {
        return [`'${this.key}'`]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'BodyParamNumDec',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}


export class GmBodyParamDec implements IGmModuleClassMethodPropDecorator {

    constructor(private readonly key: string) {
    }

    public getDecoratorName(): string {
        return 'BodyParamDec'
    }

    public getProps(): string[] {
        return [`'${this.key}'`]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'BodyParamDec',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}

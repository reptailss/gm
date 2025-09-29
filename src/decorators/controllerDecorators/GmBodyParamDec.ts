import {IGmModuleClassMethodPropDecorator} from '@decorators/interfaces/gmModuleClassMethodPropDecorator'
import {GmImport} from '@imports/types'


export class GmBodyParamNumDec implements IGmModuleClassMethodPropDecorator {

    constructor(private readonly key: string) {
    }

    public getDecoratorName(): string {
        return 'BodyParamNum'
    }

    public getProps(): string[] {
        return [`'${this.key}'`]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'BodyParamNum',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}


export class GmBodyParamDec implements IGmModuleClassMethodPropDecorator {

    constructor(private readonly key: string) {
    }

    public getDecoratorName(): string {
        return 'BodyParam'
    }

    public getProps(): string[] {
        return [`'${this.key}'`]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'BodyParam',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}

import {IGmModuleClassMethodPropDecorator} from '@decorators/interfaces/gmModuleClassMethodPropDecorator'
import {GmImport} from '@imports/types'


export class GmQueryParamNumDec implements IGmModuleClassMethodPropDecorator {
    constructor(private readonly key: string) {
    }

    public getDecoratorName(): string {
        return 'QueryParamNum'
    }

    public getProps(): string[] {
        return [`'${this.key}'`]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'QueryParamNum',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}

export class GmQueryParamDec implements IGmModuleClassMethodPropDecorator {
    constructor(private readonly key: string) {
    }

    public getDecoratorName(): string {
        return 'QueryParam'
    }

    public getProps(): string[] {
        return [`'${this.key}'`]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'QueryParam',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}


export class GmQueryParamDateDec implements IGmModuleClassMethodPropDecorator {
    constructor(private readonly key: string) {
    }

    public getDecoratorName(): string {
        return 'QueryParamDate'
    }

    public getProps(): string[] {
        return [`'${this.key}'`]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'QueryParamDate',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}

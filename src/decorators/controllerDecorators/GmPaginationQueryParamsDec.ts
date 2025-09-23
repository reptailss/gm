import {IGmModuleClassMethodDecorator} from '@decorators/interfaces/gmModuleClassMethodDecorator'
import {GmImport} from '@imports/types'


export class GmPaginationQueryParamsDec implements IGmModuleClassMethodDecorator {
    constructor(private readonly schemaVarName: string) {
    }

    public getDecoratorName(): string {
        return 'PaginationQueryParamsDec'
    }

    public getProps(): string[] {
        return [this.schemaVarName]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'PaginationQueryParamsDec',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}

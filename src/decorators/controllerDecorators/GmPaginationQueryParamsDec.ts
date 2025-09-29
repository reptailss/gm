import {IGmModuleClassMethodDecorator} from '@decorators/interfaces/gmModuleClassMethodDecorator'
import {GmImport} from '@imports/types'


export class GmPaginationQueryParamsDec implements IGmModuleClassMethodDecorator {
    constructor(private readonly schemaVarName: string) {
    }

    public getDecoratorName(): string {
        return 'PaginationParams'
    }

    public getProps(): string[] {
        return [this.schemaVarName]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'PaginationParams',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}

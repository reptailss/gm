import {IGmModuleClassMethodPropDecorator} from '@decorators/interfaces/gmModuleClassMethodPropDecorator'
import {GmImport} from '@imports/types'

export class GmBodyDec implements IGmModuleClassMethodPropDecorator {

    constructor(private readonly schemaVarName: string) {
    }

    public getDecoratorName(): string {
        return 'Body'
    }

    public getProps(): string[] {
        return [this.schemaVarName]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'Body',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}

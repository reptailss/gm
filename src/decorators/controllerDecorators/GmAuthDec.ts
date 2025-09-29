import {IGmModuleClassMethodPropDecorator} from '@decorators/interfaces/gmModuleClassMethodPropDecorator'
import {GmImport} from '@imports/types'

export class GmAuthDec implements IGmModuleClassMethodPropDecorator {

    public getDecoratorName(): string {
        return 'User'
    }

    public getProps(): string[] {
        return ['']
    }

    public getImport(): GmImport {
        return {
            propertyName: 'User',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}

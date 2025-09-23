import {IGmModuleClassMethodPropDecorator} from '@decorators/interfaces/gmModuleClassMethodPropDecorator'
import {GmImport} from '@imports/types'

export class GmAuthDec implements IGmModuleClassMethodPropDecorator {

    public getDecoratorName(): string {
        return 'AuthDec'
    }

    public getProps(): string[] {
        return []
    }

    public getImport(): GmImport {
        return {
            propertyName: 'AuthDec',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}

import {IGmModuleClassMethodPropDecorator} from '@decorators/interfaces/gmModuleClassMethodPropDecorator'
import {GmImport} from '@imports/types'

export class GmInjectableDec implements IGmModuleClassMethodPropDecorator {

    public getDecoratorName(): string {
        return 'Injectable'
    }

    public getProps(): string[] {
        return ['']
    }

    public getImport(): GmImport {
        return {
            propertyName: 'Injectable',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}

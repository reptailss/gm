import {IGmModuleClassMethodPropDecorator} from '@decorators/interfaces/gmModuleClassMethodPropDecorator'
import {GmImport} from '@imports/types'

export class GmInjectableDec implements IGmModuleClassMethodPropDecorator {

    public getDecoratorName(): string {
        return 'InjectableDec'
    }

    public getProps(): string[] {
        return ['']
    }

    public getImport(): GmImport {
        return {
            propertyName: 'InjectableDec',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}

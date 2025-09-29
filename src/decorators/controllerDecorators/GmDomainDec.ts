import {IGmModuleClassMethodDecorator} from '@decorators/interfaces/gmModuleClassMethodDecorator'
import {GmImport} from '@imports/types'

export class GmDomainDec implements IGmModuleClassMethodDecorator {

    public getDecoratorName(): string {
        return 'Domain'
    }

    public getProps(): string[] {
        return ['']
    }

    public getImport(): GmImport {
        return {
            propertyName: 'Domain',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}

import {IGmModuleClassMethodDecorator} from '@decorators/interfaces/gmModuleClassMethodDecorator'
import {GmImport} from '@imports/types'

export class GmDomainDec implements IGmModuleClassMethodDecorator {

    public getDecoratorName(): string {
        return 'DomainDec'
    }

    public getProps(): string[] {
        return []
    }

    public getImport(): GmImport {
        return {
            propertyName: 'DomainDec',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}

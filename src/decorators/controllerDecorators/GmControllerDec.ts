import {IGmModuleClassDecorator} from '@decorators/interfaces/gmModuleClassDecorator'
import {GmImport} from '@imports/types'

export class GmControllerDec implements IGmModuleClassDecorator {
    public getDecoratorName(): string {
        return 'Controller'
    }

    public getProps(): string[] {
        return ['']
    }

    public getImport(): GmImport {
        return {
            propertyName: 'Controller',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}

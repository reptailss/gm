import {IGmModuleClassMethodDecorator} from '@decorators/interfaces/gmModuleClassMethodDecorator'
import {GmImport} from '@imports/types'

export class GmGetDec implements IGmModuleClassMethodDecorator {
    constructor(private readonly url: string) {
    }

    public getDecoratorName(): string {
        return 'Get'
    }

    public getProps(): string[] {
        return [this.url]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'Get',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}

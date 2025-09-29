import {IGmModuleClassMethodDecorator} from '@decorators/interfaces/gmModuleClassMethodDecorator'
import {GmImport} from '@imports/types'

export class GmDeleteDec implements IGmModuleClassMethodDecorator {
    constructor(private readonly url: string) {
    }

    public getDecoratorName(): string {
        return 'Delete'
    }

    public getProps(): string[] {
        return [this.url]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'Delete',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}

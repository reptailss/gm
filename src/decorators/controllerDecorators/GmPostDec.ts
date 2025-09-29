import {IGmModuleClassMethodDecorator} from '@decorators/interfaces/gmModuleClassMethodDecorator'
import {GmImport} from '@imports/types'


export class GmPostDec implements IGmModuleClassMethodDecorator {
    constructor(private readonly url: string) {
    }

    public getDecoratorName(): string {
        return 'Post'
    }

    public getProps(): string[] {
        return [this.url]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'Post',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}

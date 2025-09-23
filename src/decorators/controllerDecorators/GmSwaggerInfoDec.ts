import {IGmModuleClassMethodDecorator} from '@decorators/interfaces/gmModuleClassMethodDecorator'
import {GmImport} from '@imports/types'

export class GmSwaggerInfoDec implements IGmModuleClassMethodDecorator {

    constructor(private readonly summary: string) {
    }

    public getDecoratorName(): string {
        return 'SwaggerInfoDec'
    }

    public getProps(): string[] {
        return [`{ summary:'${this.summary}'}`]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'SwaggerInfoDec',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}

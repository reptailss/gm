import {IGmModuleClassMethodDecorator} from '@decorators/interfaces/gmModuleClassMethodDecorator'
import {GmImport} from '@imports/types'

export class GmSwaggerInfoDec implements IGmModuleClassMethodDecorator {

    constructor(private readonly summary: string) {
    }

    public getDecoratorName(): string {
        return 'SwaggerInfo'
    }

    public getProps(): string[] {
        return [`{ summary:'${this.summary}'}`]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'SwaggerInfo',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}

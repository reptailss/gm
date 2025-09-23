import {IGmModuleClassMethodDecorator} from '@decorators/interfaces/gmModuleClassMethodDecorator'
import {GmImport} from '@imports/types'

export class GmImportStructureServiceEndpointDec implements IGmModuleClassMethodDecorator {

    constructor(private readonly name: string) {
    }

    public getDecoratorName(): string {
        return 'ImportStructureServiceEndpointDec'
    }

    public getProps(): string[] {
        return [`'${this.name}'`]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'ImportStructureServiceEndpointDec',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}

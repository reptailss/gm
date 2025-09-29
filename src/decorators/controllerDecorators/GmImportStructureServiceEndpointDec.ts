import {IGmModuleClassMethodDecorator} from '@decorators/interfaces/gmModuleClassMethodDecorator'
import {GmImport} from '@imports/types'

export class GmImportStructureServiceEndpointDec implements IGmModuleClassMethodDecorator {

    constructor(private readonly name: string) {
    }

    public getDecoratorName(): string {
        return 'ImportStructureServiceEndpoint'
    }

    public getProps(): string[] {
        return [`'${this.name}'`]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'ImportStructureServiceEndpoint',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}

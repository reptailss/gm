import {GmAbstractServiceFn} from '@services/abstractService/GmAbstractServiceFn'
import {IGmService} from '@services/inetfaces/gmService'
import {GmExport} from '@export/types'

export class GmServiceSchemaValidatorType extends GmAbstractServiceFn implements IGmService {
    public getExport(): GmExport {
        return {
            path: 'os-core-ts',
            propertyName: 'SchemaValidator',
            isLibImport: true,
        }
    }

    public getServiceName(): string {
        return 'SchemaValidator'
    }

    getSchemaValidatorType(baseType: string): string {
        return `SchemaValidator<${baseType}>`
    }

}

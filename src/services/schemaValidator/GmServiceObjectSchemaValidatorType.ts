import {GmAbstractServiceFn} from '@services/abstractService/GmAbstractServiceFn'
import {IGmService} from '@services/inetfaces/gmService'
import {GmExport} from '@export/types'

export class GmServiceObjectSchemaValidatorType extends GmAbstractServiceFn implements IGmService {
    public getExport(): GmExport {
        return {
            path: 'os-core-ts',
            propertyName: 'ObjectSchemaValidator',
            isLibImport: true,
        }
    }

    public getServiceName(): string {
        return 'ObjectSchemaValidator'
    }

    getSchemaValidatorType(baseType: string): string {
        return `ObjectSchemaValidator<${baseType}>`
    }

}

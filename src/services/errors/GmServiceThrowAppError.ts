import {GmAbstractServiceFn} from '@services/abstractService/GmAbstractServiceFn'
import {IGmService} from '@services/inetfaces/gmService'
import {GmExport} from '@export/types'


export class GmServiceThrowAppError extends GmAbstractServiceFn implements IGmService {

    public getServiceName(): string {
        return 'AppError'
    }

    public getExport(): GmExport {
        return {
            path: 'os-core-ts',
            propertyName: 'AppError',
            isLibImport: true,
        }
    }

    public throwAppError({
                             message,
                             errorKey,
                             ifConstruction,

                         }: {
        message: string,
        errorKey: string,
        ifConstruction?: string
    }): string {
        if (ifConstruction) {
            return `if(${ifConstruction}){
                        throw new AppError('${message}',\n{ \nerrorKey:'${errorKey}'})
                    }`
        }
        return `throw new AppError('${message}',\n{ errorKey:'${errorKey}'})`
    }
}

import {IGmServiceClass} from '@services/inetfaces/gmServiceClass'
import {GmExport} from '@export/types'
import {GmModuleConstructorProp} from '@modules/types'

export abstract class GmAbstractServiceClass implements IGmServiceClass {
    public serviceType = 'class' as const

    public abstract getServiceName(): string

    public abstract getExport(): GmExport

    public abstract getConstructorProp(): GmModuleConstructorProp
}
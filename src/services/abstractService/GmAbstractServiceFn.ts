import {IGmServiceFn} from '@services/inetfaces/gmServiceFn'
import {GmExport} from '@export/types'

export abstract class GmAbstractServiceFn implements IGmServiceFn {
    public serviceType = 'fn' as const

    public abstract getServiceName(): string

    public abstract getExport(): GmExport
}
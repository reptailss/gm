import {GmConfig, GmEndpointType} from '@config/types'

export class GmEndpointsUrlsHelper {
    static getEndpointUrl = (
        config: GmConfig,
        endpointType: GmEndpointType,
    ) => {
        return `/${endpointType}`

    }
}
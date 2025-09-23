import {GmConfig, GmEndpointType} from 'os-core-ts'

export class GmEndpointsUrlsHelper {
    static getEndpointUrl = (
        config: GmConfig,
        endpointType: GmEndpointType,
    ) => {
        return `/${endpointType}`

    }
}
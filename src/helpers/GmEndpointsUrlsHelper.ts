import {GmCrudConfig, GmCrudEndpointType} from 'os-core-ts'

export class GmEndpointsUrlsHelper {
    static getEndpointUrl = (
        config: GmCrudConfig,
        endpointType: GmCrudEndpointType,
    ) => {
        return `/${endpointType}`

    }
}
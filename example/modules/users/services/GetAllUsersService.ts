import {PaginationQueryParams, PaginationValues} from 'os-core-ts'
import {getUsersModel, GetUsersModelCb} from '@modules/users/model'
import {UserDto} from '@modules/users/dto'

export class GetAllUsersService {
    constructor(private readonly getModelCb: GetUsersModelCb = getUsersModel) {}

    public async getUsersPagination({
        domain,
        params,
    }: {
        domain: string
        params: PaginationQueryParams<UserDto>
    }): Promise<PaginationValues<UserDto>> {
        const model = await this.getModelCb(domain)
        return model.pagination(params)
    }
}

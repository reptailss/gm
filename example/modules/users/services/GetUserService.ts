import {getUsersModel, GetUsersModelCb} from '@modules/users/model'
import {UserDto} from '@modules/users/dto'

export class GetUserService {
    constructor(private readonly getModelCb: GetUsersModelCb = getUsersModel) {}

    public async getUserById({domain, id}: {domain: string; id: number}): Promise<UserDto | null> {
        const model = await this.getModelCb(domain)
        return model.findByPk(id)
    }
}

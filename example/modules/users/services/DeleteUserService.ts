import {ActionsLoggerService, AppError} from 'os-core-ts'
import {getUsersModel, GetUsersModelCb} from '@modules/users/model'
import {UserDto} from '@modules/users/dto'

export class DeleteUserService {
    constructor(
        private readonly getModelCb: GetUsersModelCb = getUsersModel,
        private readonly actionsLoggerService: ActionsLoggerService = new ActionsLoggerService(),
    ) {}

    public async deleteUserById({
        domain,
        initiatorOpenUserId,
        id,
    }: {
        domain: string
        initiatorOpenUserId: number
        id: number
    }): Promise<UserDto> {
        const model = await this.getModelCb(domain)
        const oldDto = await model.findOne({
            filters: {id: id},
        })
        if (!oldDto) {
            throw new AppError('Not found', {
                errorKey: 'NOT_FOUND_ERROR',
            })
        }
        await model.destroy({
            filters: {id: id},
        })

        await this.actionsLoggerService.logDeleteAction({
            oldValue: oldDto,
            openUserId: initiatorOpenUserId,
            config: model.getConfig(),
            rowId: id,
        })

        return oldDto
    }
}

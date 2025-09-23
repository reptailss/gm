import {ActionsLoggerService, AppError} from 'os-core-ts'
import {getUsersModel, GetUsersModelCb} from '@modules/users/model'
import {UserDto, UpdateUserDto} from '@modules/users/dto'

export class UpdateUserService {
    constructor(
        private readonly getModelCb: GetUsersModelCb = getUsersModel,
        private readonly actionsLoggerService: ActionsLoggerService = new ActionsLoggerService(),
    ) {}

    public async updateUser({
        domain,
        initiatorOpenUserId,
        updateDto,
        id,
    }: {
        domain: string
        initiatorOpenUserId: number
        updateDto: UpdateUserDto
        id: number
    }): Promise<UserDto> {
        const model = await this.getModelCb(domain)
        const oldDto = await model.findByPk(id)
        if (!oldDto) {
            throw new AppError('Not found.', {
                errorKey: 'NOT_FOUND_ERROR',
            })
        }

        const newDto = await model.update(updateDto, {
            filters: {id: id},
            returning: true,
        })
        await this.actionsLoggerService.logUpdateAction({
            oldValue: oldDto,
            newValue: newDto,
            openUserId: initiatorOpenUserId,
            config: model.getConfig(),
            rowId: id,
        })

        return newDto
    }
}

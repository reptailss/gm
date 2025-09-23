import {ActionsLoggerService, AppError} from 'os-core-ts'
import {getUsersModel, GetUsersModelCb} from '@modules/users/model'
import {UserDto, CreateUserDto} from '@modules/users/dto'

export class CreateUserService {
    constructor(
        private readonly getModelCb: GetUsersModelCb = getUsersModel,
        private readonly actionsLoggerService: ActionsLoggerService = new ActionsLoggerService(),
    ) {}

    public async createUser({
        domain,
        initiatorOpenUserId,
        createDto,
    }: {
        domain: string
        initiatorOpenUserId: number
        createDto: CreateUserDto
    }): Promise<UserDto> {
        const model = await this.getModelCb(domain)
        const newDto = await model.create(createDto)
        await this.actionsLoggerService.logCreateAction({
            value: newDto,
            openUserId: initiatorOpenUserId,
            config: model.getConfig(),
            rowId: newDto.id,
        })

        return newDto
    }
}

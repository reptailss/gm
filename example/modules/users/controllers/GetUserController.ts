import {
    ControllerDec,
    DomainDec,
    BuildResponseFormat,
    RowResult,
    AppError,
    SwaggerInfoDec,
    GetDec,
    ParamNumDec,
} from 'os-core-ts'
import {GetUserService} from '@modules/users/services/GetUserService'
import {UserDto} from '@modules/users/dto'
import {USERS_ROUTE_PATHS} from '@modules/users/constants/routePaths'

@ControllerDec()
export class GetUserController {
    constructor(private readonly getUserService: GetUserService = new GetUserService()) {}

    @SwaggerInfoDec({summary: 'Get user by id'})
    @GetDec(USERS_ROUTE_PATHS.get)
    public async getUserById(
        @DomainDec domain: string,
        @ParamNumDec('id') id: number,
    ): Promise<RowResult<UserDto>> {
        const dto = await this.getUserService.getUserById({domain, id})
        if (!dto) {
            throw new AppError('Not found', {
                errorKey: 'NOT_FOUND_ERROR',
            })
        }
        return BuildResponseFormat.row(dto)
    }
}

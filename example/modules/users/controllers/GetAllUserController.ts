import {
    ControllerDec,
    DomainDec,
    BuildResponseFormat,
    PaginationResult,
    PaginationQueryParams,
    SwaggerInfoDec,
    GetDec,
    PaginationQueryParamsDec,
} from 'os-core-ts'
import {UsersValidator} from '@modules/users/validator/UsersValidator'
import {GetAllUsersService} from '@modules/users/services/GetAllUsersService'
import {UserDto} from '@modules/users/dto'
import {USERS_ROUTE_PATHS} from '@modules/users/constants/routePaths'

const usersValidator = new UsersValidator()

const userDtoPaginationQueryParamsSchema = usersValidator.getUserDtoPaginationQueryParamsSchema()

@ControllerDec()
export class GetAllUserController {
    constructor(
        private readonly getAllUserService: GetAllUsersService = new GetAllUsersService(),
    ) {}

    @SwaggerInfoDec({summary: 'Get users list'})
    @GetDec(USERS_ROUTE_PATHS.list)
    public async getUsersPagination(
        @DomainDec domain: string,
        @PaginationQueryParamsDec(userDtoPaginationQueryParamsSchema)
        params: PaginationQueryParams<UserDto>,
    ): Promise<PaginationResult<UserDto>> {
        const paginationValues = await this.getAllUserService.getUsersPagination({domain, params})
        return BuildResponseFormat.pagination(paginationValues)
    }
}

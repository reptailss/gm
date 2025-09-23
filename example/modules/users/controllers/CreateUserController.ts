import {
    ControllerDec,
    DomainDec,
    ImportStructureServiceEndpointDec,
    StructureAccessService,
    OsCoreLegalEntityService,
    BuildResponseFormat,
    MutateRowResult,
    SwaggerInfoDec,
    PostDec,
    BodyDec,
    UserInfo,
    AuthDec,
} from 'os-core-ts'
import {UsersValidator} from '@modules/users/validator/UsersValidator'
import {CreateUserService} from '@modules/users/services/CreateUserService'
import {USERS_ROUTE_PATHS} from '@modules/users/constants/routePaths'
import {CreateUserDto} from '@modules/users/dto'

const usersValidator = new UsersValidator()

const createUserDtoSchema = usersValidator.getCreateUserDtoSchema()

@ControllerDec()
export class CreateUserController {
    constructor(private readonly createUserService: CreateUserService = new CreateUserService()) {}

    @ImportStructureServiceEndpointDec('Add new user')
    @SwaggerInfoDec({summary: 'Add new user'})
    @PostDec(USERS_ROUTE_PATHS.add)
    public async createUser(
        @DomainDec domain: string,
        @BodyDec(createUserDtoSchema) createDto: CreateUserDto,
        @AuthDec userInfo: UserInfo,
    ): Promise<MutateRowResult<number>> {
        const legalEntityId = await OsCoreLegalEntityService.getIdByDomain(domain)
        await StructureAccessService.checkAccess({
            openUserId: userInfo.open_user_id,
            legalEntityId,
            endpoint: USERS_ROUTE_PATHS.add,
        })
        const newDto = await this.createUserService.createUser({
            domain,
            initiatorOpenUserId: userInfo.open_user_id,
            createDto,
        })
        return BuildResponseFormat.mutateRow(newDto.id)
    }
}

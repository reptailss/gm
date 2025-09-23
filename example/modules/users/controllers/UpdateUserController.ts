import {
    ControllerDec,
    DomainDec,
    ImportStructureServiceEndpointDec,
    StructureAccessService,
    OsCoreLegalEntityService,
    BuildResponseFormat,
    MutateRowResult,
    SwaggerInfoDec,
    PutDec,
    BodyDec,
    UserInfo,
    AuthDec,
    ParamNumDec,
} from 'os-core-ts'
import {UsersValidator} from '@modules/users/validator/UsersValidator'
import {UpdateUserService} from '@modules/users/services/UpdateUserService'
import {UpdateUserDto} from '@modules/users/dto'
import {USERS_ROUTE_PATHS} from '@modules/users/constants/routePaths'

const usersValidator = new UsersValidator()

const updateUserDtoSchema = usersValidator.getUpdateUserDtoSchema()

@ControllerDec()
export class UpdateUserController {
    constructor(private readonly updateUserService: UpdateUserService = new UpdateUserService()) {}

    @ImportStructureServiceEndpointDec('Update user')
    @SwaggerInfoDec({summary: 'Update user by id'})
    @PutDec(USERS_ROUTE_PATHS.update)
    public async updateUser(
        @DomainDec domain: string,
        @BodyDec(updateUserDtoSchema) updateDto: UpdateUserDto,
        @AuthDec userInfo: UserInfo,
        @ParamNumDec('id') id: number,
    ): Promise<MutateRowResult<number>> {
        const legalEntityId = await OsCoreLegalEntityService.getIdByDomain(domain)
        await StructureAccessService.checkAccess({
            openUserId: userInfo.open_user_id,
            legalEntityId,
            endpoint: USERS_ROUTE_PATHS.update,
        })
        const newDto = await this.updateUserService.updateUser({
            domain,
            initiatorOpenUserId: userInfo.open_user_id,
            updateDto,
            id,
        })
        return BuildResponseFormat.mutateRow(newDto.id)
    }
}

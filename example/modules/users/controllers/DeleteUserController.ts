import {
    ControllerDec,
    DomainDec,
    ImportStructureServiceEndpointDec,
    StructureAccessService,
    OsCoreLegalEntityService,
    BuildResponseFormat,
    MutateRowResult,
    SwaggerInfoDec,
    DeleteDec,
    UserInfo,
    AuthDec,
    ParamNumDec,
} from 'os-core-ts'
import {DeleteUserService} from '@modules/users/services/DeleteUserService'
import {USERS_ROUTE_PATHS} from '@modules/users/constants/routePaths'

@ControllerDec()
export class DeleteUserController {
    constructor(private readonly deleteUserService: DeleteUserService = new DeleteUserService()) {}

    @ImportStructureServiceEndpointDec('Delete user')
    @SwaggerInfoDec({summary: 'Delete user'})
    @DeleteDec(USERS_ROUTE_PATHS.delete)
    public async deleteUser(
        @DomainDec domain: string,
        @AuthDec userInfo: UserInfo,
        @ParamNumDec('id') id: number,
    ): Promise<MutateRowResult<number>> {
        const legalEntityId = await OsCoreLegalEntityService.getIdByDomain(domain)
        await StructureAccessService.checkAccess({
            openUserId: userInfo.open_user_id,
            legalEntityId,
            endpoint: USERS_ROUTE_PATHS.delete,
        })
        const oldDto = await this.deleteUserService.deleteUserById({
            domain,
            initiatorOpenUserId: userInfo.open_user_id,
            id,
        })
        return BuildResponseFormat.mutateRow(oldDto.id)
    }
}

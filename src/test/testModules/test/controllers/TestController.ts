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
    PutDec,
    ParamNumDec,
    DeleteDec,
    RowResult,
    AppError,
    GetDec,
    PaginationResult,
    PaginationQueryParams,
    PaginationQueryParamsDec,
} from 'os-core-ts'
import {TestValidator} from '@testModules/test/validator/TestValidator'
import {TestService} from '@testModules/test/services/TestService'
import {TEST_ROUTE_PATHS} from '@testModules/test/constants/routePaths'
import {CreateTestDto, UpdateTestDto, TestDto} from '@testModules/test/dto'

const testValidator = new TestValidator()
const createTestDtoSchema = testValidator.getCreateTestDtoSchema()
const updateTestDtoSchema = testValidator.getUpdateTestDtoSchema()
const testDtoPaginationQueryParamsSchema = testValidator.getTestDtoPaginationQueryParamsSchema()

@ControllerDec()
export class TestController {
    constructor(private readonly testService: TestService) {}

    @ImportStructureServiceEndpointDec('Add new test')
    @SwaggerInfoDec({summary: 'Add new test'})
    @PostDec(TEST_ROUTE_PATHS.add)
    public async create(
        @DomainDec domain: string,
        @BodyDec(createTestDtoSchema) createDto: CreateTestDto,
        @AuthDec userInfo: UserInfo,
    ): Promise<MutateRowResult<number>> {
        const legalEntityId = await OsCoreLegalEntityService.getIdByDomain(domain)
        await StructureAccessService.checkAccess({
            openUserId: userInfo.open_user_id,
            legalEntityId,
            endpoint: TEST_ROUTE_PATHS.add,
        })
        const newDto = await this.testService.create({
            domain,
            initiatorOpenUserId: userInfo.open_user_id,
            createDto,
        })
        return BuildResponseFormat.mutateRow(newDto.id)
    }

    @ImportStructureServiceEndpointDec('Update test')
    @SwaggerInfoDec({summary: 'Update test by id'})
    @PutDec(TEST_ROUTE_PATHS.update)
    public async update(
        @DomainDec domain: string,
        @BodyDec(updateTestDtoSchema) updateDto: UpdateTestDto,
        @AuthDec userInfo: UserInfo,
        @ParamNumDec('id') id: number,
    ): Promise<MutateRowResult<number>> {
        const legalEntityId = await OsCoreLegalEntityService.getIdByDomain(domain)
        await StructureAccessService.checkAccess({
            openUserId: userInfo.open_user_id,
            legalEntityId,
            endpoint: TEST_ROUTE_PATHS.update,
        })
        const newDto = await this.testService.update({
            domain,
            initiatorOpenUserId: userInfo.open_user_id,
            updateDto,
            id,
        })
        return BuildResponseFormat.mutateRow(newDto.id)
    }

    @ImportStructureServiceEndpointDec('Delete test')
    @SwaggerInfoDec({summary: 'Delete test'})
    @DeleteDec(TEST_ROUTE_PATHS.delete)
    public async delete(
        @DomainDec domain: string,
        @AuthDec userInfo: UserInfo,
        @ParamNumDec('id') id: number,
    ): Promise<MutateRowResult<number>> {
        const legalEntityId = await OsCoreLegalEntityService.getIdByDomain(domain)
        await StructureAccessService.checkAccess({
            openUserId: userInfo.open_user_id,
            legalEntityId,
            endpoint: TEST_ROUTE_PATHS.delete,
        })
        const oldDto = await this.testService.delete({
            domain,
            initiatorOpenUserId: userInfo.open_user_id,
            id,
        })
        return BuildResponseFormat.mutateRow(oldDto.id)
    }

    @ImportStructureServiceEndpointDec('Get test')
    @SwaggerInfoDec({summary: 'Get test by id'})
    @GetDec(TEST_ROUTE_PATHS.get)
    public async getById(
        @DomainDec domain: string,
        @AuthDec userInfo: UserInfo,
        @ParamNumDec('id') id: number,
    ): Promise<RowResult<TestDto>> {
        const legalEntityId = await OsCoreLegalEntityService.getIdByDomain(domain)
        await StructureAccessService.checkAccess({
            openUserId: userInfo.open_user_id,
            legalEntityId,
            endpoint: TEST_ROUTE_PATHS.get,
        })
        const dto = await this.testService.getById({domain, id})
        if (!dto) {
            throw new AppError('Not found', {
                errorKey: 'NOT_FOUND_ERROR',
            })
        }
        return BuildResponseFormat.row(dto)
    }

    @ImportStructureServiceEndpointDec('Get list test')
    @SwaggerInfoDec({summary: 'Get test list'})
    @GetDec(TEST_ROUTE_PATHS.list)
    public async pagination(
        @DomainDec domain: string,
        @AuthDec userInfo: UserInfo,
        @PaginationQueryParamsDec(testDtoPaginationQueryParamsSchema)
        params: PaginationQueryParams<TestDto>,
    ): Promise<PaginationResult<TestDto>> {
        const legalEntityId = await OsCoreLegalEntityService.getIdByDomain(domain)
        await StructureAccessService.checkAccess({
            openUserId: userInfo.open_user_id,
            legalEntityId,
            endpoint: TEST_ROUTE_PATHS.list,
        })
        const paginationValues = await this.testService.pagination({domain, params})
        return BuildResponseFormat.pagination(paginationValues)
    }
}

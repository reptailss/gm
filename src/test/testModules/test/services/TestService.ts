import {
    InjectableDec,
    ActionsLoggerService,
    AppError,
    PaginationQueryParams,
    PaginationValues,
} from 'os-core-ts'
import {LoaderTestRepository} from '@testModules/test/repository'
import {TestDto, CreateTestDto, UpdateTestDto} from '@testModules/test/dto'

@InjectableDec()
export class TestService {
    constructor(
        private readonly loaderRepository: LoaderTestRepository,
        private readonly actionsLoggerService: ActionsLoggerService,
    ) {}

    public async create({
        domain,
        initiatorOpenUserId,
        createDto,
    }: {
        domain: string
        initiatorOpenUserId: number
        createDto: CreateTestDto
    }): Promise<TestDto> {
        const repository = await this.loaderRepository.load(domain)
        const newDto = await repository.create(createDto)
        await this.actionsLoggerService.logCreateAction({
            value: newDto,
            openUserId: initiatorOpenUserId,
            config: repository.getConfig(),
            rowId: newDto.id,
        })

        return newDto
    }

    public async update({
        domain,
        initiatorOpenUserId,
        updateDto,
        id,
    }: {
        domain: string
        initiatorOpenUserId: number
        updateDto: UpdateTestDto
        id: number
    }): Promise<TestDto> {
        const repository = await this.loaderRepository.load(domain)
        const oldDto = await repository.findByPk(id)
        if (!oldDto) {
            throw new AppError('Not found.', {
                errorKey: 'NOT_FOUND_ERROR',
            })
        }

        const newDto = await repository.update(updateDto, {id: id})
        await this.actionsLoggerService.logUpdateAction({
            oldValue: oldDto,
            newValue: newDto,
            openUserId: initiatorOpenUserId,
            config: repository.getConfig(),
            rowId: id,
        })

        return newDto
    }

    public async delete({
        domain,
        initiatorOpenUserId,
        id,
    }: {
        domain: string
        initiatorOpenUserId: number
        id: number
    }): Promise<TestDto> {
        const repository = await this.loaderRepository.load(domain)
        const oldDto = await repository.findOne({id: id})
        if (!oldDto) {
            throw new AppError('Not found', {
                errorKey: 'NOT_FOUND_ERROR',
            })
        }
        await repository.destroy({id: id})

        await this.actionsLoggerService.logDeleteAction({
            oldValue: oldDto,
            openUserId: initiatorOpenUserId,
            config: repository.getConfig(),
            rowId: id,
        })

        return oldDto
    }

    public async getById({domain, id}: {domain: string; id: number}): Promise<TestDto | null> {
        const repository = await this.loaderRepository.load(domain)
        return repository.findByPk(id)
    }

    public async pagination({
        domain,
        params,
    }: {
        domain: string
        params: PaginationQueryParams<TestDto>
    }): Promise<PaginationValues<TestDto>> {
        const repository = await this.loaderRepository.load(domain)
        return repository.pagination(params)
    }
}

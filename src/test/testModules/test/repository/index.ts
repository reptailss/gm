import { Entity, WhereSql, PaginationQueryParams, PaginationValues, ISqlRepository, LoaderSqlRepository, InjectableDec } from 'os-core-ts';
import { TestEntity } from '@testModules/test/repository/entity';
import { TestDto, CreateTestDto, UpdateTestDto } from '@testModules/test/dto';


class TestRepository {
    constructor(private readonly repository: ISqlRepository<TestEntity>) {}

    public async create(createDto: CreateTestDto): Promise<TestDto> {
        return this.repository.create(createDto)
    }

    public async update(
        updateDto: UpdateTestDto,
        where: WhereSql<Entity<TestEntity>>,
    ): Promise<TestDto> {
        return this.repository.update(updateDto, {where}, true)
    }

    public async destroy(where: WhereSql<Entity<TestEntity>>): Promise<number> {
        return this.repository.destroy({where})
    }

    public async findOne(where: WhereSql<Entity<TestEntity>>): Promise<TestDto | null> {
        return this.repository.findOne({where})
    }

    public async findByPk(id: number): Promise<TestDto | null> {
        return this.repository.findByPk(id)
    }

    public async findAll(where: WhereSql<Entity<TestEntity>>): Promise<TestDto[]> {
        return this.repository.findAll({where})
    }

    public async pagination(
        params: PaginationQueryParams<Entity<TestEntity>>,
    ): Promise<PaginationValues<TestDto>> {
        return this.repository.pagination(params)
    }

    public getConfig(): {
        database: string
        host: string
        port: string
        dbType: 'mysql'
        tableName: string
    } {
        return this.repository.getConfig()
    }
}


@InjectableDec()
export class LoaderTestRepository {
    constructor(private readonly loaderSqlRepository: LoaderSqlRepository) {}

    public async load(domain: string): Promise<TestRepository> {
        const repository = await this.loaderSqlRepository.dynamicByDomain({
            entity: new TestEntity(),
            tableName: 'test',
            domain,
        })

        return new TestRepository(repository)
    }
}

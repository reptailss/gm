import { Entity, WhereSql, PaginationQueryParams, PaginationValues, ISqlRepository, LoaderSqlRepository } from 'os-core-ts';
import { TestEntity } from "./entity";
import { TestDto, CreateTestDto, UpdateTestDto } from "../dto";
declare class TestRepository {
    private readonly repository;
    constructor(repository: ISqlRepository<TestEntity>);
    create(createDto: CreateTestDto): Promise<TestDto>;
    update(updateDto: UpdateTestDto, where: WhereSql<Entity<TestEntity>>): Promise<TestDto>;
    destroy(where: WhereSql<Entity<TestEntity>>): Promise<number>;
    findOne(where: WhereSql<Entity<TestEntity>>): Promise<TestDto | null>;
    findByPk(id: number): Promise<TestDto | null>;
    findAll(where: WhereSql<Entity<TestEntity>>): Promise<TestDto[]>;
    pagination(params: PaginationQueryParams<Entity<TestEntity>>): Promise<PaginationValues<TestDto>>;
    getConfig(): {
        database: string;
        host: string;
        port: string;
        dbType: 'mysql';
        tableName: string;
    };
}
export declare class LoaderTestRepository {
    private readonly loaderSqlRepository;
    constructor(loaderSqlRepository: LoaderSqlRepository);
    load(domain: string): Promise<TestRepository>;
}
export {};

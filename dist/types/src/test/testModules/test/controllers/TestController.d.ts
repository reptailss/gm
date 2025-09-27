import { MutateRowResult, UserInfo, RowResult, PaginationResult, PaginationQueryParams } from 'os-core-ts';
import { TestService } from "../services/TestService";
import { CreateTestDto, UpdateTestDto, TestDto } from "../dto";
export declare class TestController {
    private readonly testService;
    constructor(testService: TestService);
    create(domain: string, createDto: CreateTestDto, userInfo: UserInfo): Promise<MutateRowResult<number>>;
    update(domain: string, updateDto: UpdateTestDto, userInfo: UserInfo, id: number): Promise<MutateRowResult<number>>;
    delete(domain: string, userInfo: UserInfo, id: number): Promise<MutateRowResult<number>>;
    getById(domain: string, userInfo: UserInfo, id: number): Promise<RowResult<TestDto>>;
    pagination(domain: string, userInfo: UserInfo, params: PaginationQueryParams<TestDto>): Promise<PaginationResult<TestDto>>;
}

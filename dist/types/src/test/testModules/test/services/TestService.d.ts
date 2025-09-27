import { ActionsLoggerService, PaginationQueryParams, PaginationValues } from 'os-core-ts';
import { LoaderTestRepository } from "../repository";
import { TestDto, CreateTestDto, UpdateTestDto } from "../dto";
export declare class TestService {
    private readonly loaderRepository;
    private readonly actionsLoggerService;
    constructor(loaderRepository: LoaderTestRepository, actionsLoggerService: ActionsLoggerService);
    create({ domain, initiatorOpenUserId, createDto, }: {
        domain: string;
        initiatorOpenUserId: number;
        createDto: CreateTestDto;
    }): Promise<TestDto>;
    update({ domain, initiatorOpenUserId, updateDto, id, }: {
        domain: string;
        initiatorOpenUserId: number;
        updateDto: UpdateTestDto;
        id: number;
    }): Promise<TestDto>;
    delete({ domain, initiatorOpenUserId, id, }: {
        domain: string;
        initiatorOpenUserId: number;
        id: number;
    }): Promise<TestDto>;
    getById({ domain, id }: {
        domain: string;
        id: number;
    }): Promise<TestDto | null>;
    pagination({ domain, params, }: {
        domain: string;
        params: PaginationQueryParams<TestDto>;
    }): Promise<PaginationValues<TestDto>>;
}

import { ObjectSchemaValidator, SchemaValidator, PaginationQueryParams } from 'os-core-ts';
import { CreateTestDto, UpdateTestDto, TestDto } from "../dto";
export declare class TestValidator {
    getCreateTestDtoSchema(): ObjectSchemaValidator<CreateTestDto>;
    getUpdateTestDtoSchema(): ObjectSchemaValidator<UpdateTestDto>;
    getTestDtoSchema(): SchemaValidator<TestDto>;
    getTestDtoPaginationQueryParamsSchema(): SchemaValidator<PaginationQueryParams<TestDto>>;
}

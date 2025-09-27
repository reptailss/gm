import {
    ObjectSchemaValidator,
    Validator,
    SchemaValidator,
    PaginationQueryParams,
    PaginationQueryParamsValidator,
} from 'os-core-ts'
import {CreateTestDto, UpdateTestDto, TestDto} from '@testModules/test/dto'

export class TestValidator {
    public getCreateTestDtoSchema(): ObjectSchemaValidator<CreateTestDto> {
        return Validator.object({name: Validator.string().max(255), age: Validator.number()})
    }

    public getUpdateTestDtoSchema(): ObjectSchemaValidator<UpdateTestDto> {
        return this.getCreateTestDtoSchema().partial()
    }

    public getTestDtoSchema(): SchemaValidator<TestDto> {
        return this.getCreateTestDtoSchema().merge(
            Validator.object({
                date_add: Validator.date(),
                date_update: Validator.date(),
                id: Validator.number(),
            }),
        )
    }

    public getTestDtoPaginationQueryParamsSchema(): SchemaValidator<
        PaginationQueryParams<TestDto>
    > {
        return PaginationQueryParamsValidator.getSchema(this.getTestDtoSchema())
    }
}

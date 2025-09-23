import {
    ObjectSchemaValidator,
    Validator,
    SchemaValidator,
    PaginationQueryParams,
    PaginationQueryParamsValidator,
} from 'os-core-ts'
import {CreateUserDto, UpdateUserDto, UserDto} from '@modules/users/dto'

export class UsersValidator {
    constructor() {}

    public getCreateUserDtoSchema(): ObjectSchemaValidator<CreateUserDto> {
        return Validator.object({name: Validator.string().max(255), age: Validator.number()})
    }

    public getUpdateUserDtoSchema(): ObjectSchemaValidator<UpdateUserDto> {
        return this.getCreateUserDtoSchema().partial()
    }

    public getUserDtoSchema(): SchemaValidator<UserDto> {
        return this.getCreateUserDtoSchema().merge(
            Validator.object({
                date_add: Validator.date(),
                date_update: Validator.date(),
                id: Validator.number(),
            }),
        )
    }

    public getUserDtoPaginationQueryParamsSchema(): SchemaValidator<
        PaginationQueryParams<UserDto>
    > {
        return PaginationQueryParamsValidator.getSchema(this.getUserDtoSchema())
    }
}

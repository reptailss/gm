

export type UserDto = CreateUserDto & {
    id: number
    date_add: Date
    date_update: Date
}


export type UpdateUserDto = Partial<CreateUserDto>

export type CreateUserDto = {
    name: string
    age: number
}

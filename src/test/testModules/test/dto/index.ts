

export type TestDto = CreateTestDto & {
    id: number
    date_add: Date
    date_update: Date
}


export type UpdateTestDto = Partial<CreateTestDto>

export type CreateTestDto = {
    name: string
    age: number
}

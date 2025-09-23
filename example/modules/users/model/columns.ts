import {ModelSqlColumns} from 'os-core-ts'
import {UserDto} from '@modules/users/dto'

export const USERS_COLUMNS: ModelSqlColumns<UserDto> = {
    name: {
        type: 'STRING',
    },
    age: {
        type: 'INTEGER',
    },
}

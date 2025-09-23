import {AppModule} from 'os-core-ts'
import {CreateUserController} from '@modules/users/controllers/CreateUserController'
import {UpdateUserController} from '@modules/users/controllers/UpdateUserController'
import {DeleteUserController} from '@modules/users/controllers/DeleteUserController'
import {GetUserController} from '@modules/users/controllers/GetUserController'
import {GetAllUserController} from '@modules/users/controllers/GetAllUserController'

export const usersAppModule = new AppModule({
    controllers: [
        CreateUserController,
        UpdateUserController,
        DeleteUserController,
        GetUserController,
        GetAllUserController,
    ],
    swaggerInfo: {
        tag: 'Users',
    },
})

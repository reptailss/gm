import { IModelSql, LoaderModelSql } from 'os-core-ts';
import { USERS_COLUMNS } from '@modules/users/model/columns';
import { UserDto } from '@modules/users/dto';
import { USERS_TABLE_NAME } from '@modules/users/model/constants';


export type GetUsersModelCb = (domain: string) => Promise<IModelSql<UserDto>>


export const getUsersModel: GetUsersModelCb = async (domain: string) => {
    return LoaderModelSql.dynamicByDomain({
        columns: USERS_COLUMNS,
        tableName: USERS_TABLE_NAME,
        domain,
    })
}

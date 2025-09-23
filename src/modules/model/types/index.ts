import {GmModelNoSqlColumn, GmModelSqlColumn} from '@config/types/columns'


export interface GmGenerateColumnModelSql {
    key: string,
    column: GmModelSqlColumn
}

export interface GmGenerateColumnModelNoSql {
    key: string,
    column: GmModelNoSqlColumn
}

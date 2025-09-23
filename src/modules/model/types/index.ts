import {GmModelNoSqlColumn, GmModelSqlColumn} from 'os-core-ts'


export interface GmGenerateColumnModelSql {
    key: string,
    column: GmModelSqlColumn
}

export interface GmGenerateColumnModelNoSql {
    key: string,
    column: GmModelNoSqlColumn
}

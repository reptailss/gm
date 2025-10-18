import {GmCrudConfig} from 'os-core-ts'
import {GmModuleDtoField} from '@modules/dto/types'


export class GmModuleDtoHelper {
    
    static getDtoPrimaryKeyByConfig = (config: GmCrudConfig): GmModuleDtoField => {
        switch (config.repository.dbType) {
            case 'noSql': {
                return {
                    key: '_id',
                    type: 'string',
                    columnType: 'STRING',
                }
            }
            case 'sql': {
                return {
                    key: 'id',
                    type: 'number',
                    columnType: 'INTEGER',
                }
            }
        }
    }
    
    static getTypeByColumn = (
        type: 'INTEGER' |
            'BIGINT' |
            'FLOAT' |
            'STRING' |
            'TEXT' |
            'JSON' |
            'DATETIME' |
            'BOOLEAN' |
            'FILE' |
            'OBJECT' |
            'OPEN_USER_ID',
    ): GmModuleDtoField['type'] => {
        switch (type) {
            case 'INTEGER':
                return 'number'
            case 'BIGINT':
                return 'number'
            case 'FLOAT':
                return 'number'
            case 'BOOLEAN':
                return 'boolean'
            
            case 'STRING':
                return 'string'
            case 'TEXT':
                return 'string'
            case 'JSON':
                return 'object'
            case 'OBJECT':
                return 'object'
            case 'DATETIME':
                return 'Date'
            case 'FILE' :
                return 'string'
            case 'OPEN_USER_ID' :
                return 'number'
            
            default:
                return 'string'
        }
    }
}
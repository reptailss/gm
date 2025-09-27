import { GmCrudConfig } from 'os-core-ts';
import { GmModuleDtoField } from "../types";
export declare class GmModuleDtoHelper {
    static getDtoPrimaryKeyByConfig: (config: GmCrudConfig) => GmModuleDtoField;
    static getTypeByColumn: (type: 'INTEGER' | 'BIGINT' | 'FLOAT' | 'STRING' | 'TEXT' | 'JSON' | 'DATETIME' | 'BOOLEAN' | 'FILE' | 'OBJECT' | 'OPEN_USER_ID') => GmModuleDtoField['type'];
}

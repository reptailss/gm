import { GmConfig } from "../../../os-core";
import { GmModuleDtoField } from "../types";
export declare class GmModuleDtoHelper {
    static getDtoPrimaryKeyByConfig: (config: GmConfig) => GmModuleDtoField;
    static getTypeByColumn: (type: 'INTEGER' | 'BIGINT' | 'FLOAT' | 'STRING' | 'TEXT' | 'JSON' | 'DATETIME' | 'BOOLEAN' | 'FILE' | 'OBJECT' | 'OPEN_USER_ID') => GmModuleDtoField['type'];
}

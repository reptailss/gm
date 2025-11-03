import { GmCrudConfig } from "../../../os-core";
import { GmModuleDtoField } from "../types";
export declare class GmModuleDtoHelper {
    static getDtoPrimaryKeyByConfig: (config: GmCrudConfig) => GmModuleDtoField;
    static getTypeByColumn: (type: 'INTEGER' | 'BIGINT' | 'FLOAT' | 'STRING' | 'TEXT' | 'JSON' | 'DATETIME' | 'BOOLEAN' | 'OBJECT') => GmModuleDtoField['type'];
}

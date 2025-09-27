import { GmCrudConfig } from 'os-core-ts';
export declare class GmCrudConfigChecker {
    static hasActionLogger(config: GmCrudConfig, endpointType: 'add' | 'delete' | 'update'): boolean;
    static hasStructureAccess(config: GmCrudConfig, endpointType: 'add' | 'delete' | 'update' | 'list' | 'get'): boolean;
    static hasAuth(config: GmCrudConfig, endpointType: 'add' | 'delete' | 'update' | 'list' | 'get'): boolean;
}

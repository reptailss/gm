import { GmModuleServiceClassBySqlDynamicDomain } from "../../bases/GmModuleServiceClassBySqlDynamicDomain";
import { GmModuleServiceClassAll, GmModuleServiceClassCreate, GmModuleServiceClassDelete, GmModuleServiceClassGet, GmModuleServiceClassGetAll, GmModuleServiceClassUpdate } from "../../../interfaces/gmModuleServiceClassCurd";
import { IGmModuleServiceApiAll, IGmModuleServiceApiCreate, IGmModuleServiceApiDelete, IGmModuleServiceApiGet, IGmModuleServiceApiGetPagination, IGmModuleServiceApiUpdate } from "../../../interfaces/gmModuleServiceClassCurdApi";
import { GmCrudConfig } from 'os-core-ts';
type BaseCallBarNames = {
    domain: string;
};
type AllCallVarNames = {
    create: CreateCallVarNames;
    update: UpdateCallVarNames;
    delete: DeleteCallVarNames;
    getById: GetByIdCallVarNames;
    getPagination: GetPaginationCallVarNames;
};
type CreateCallVarNames = BaseCallBarNames & {
    initiatorOpenUserId: string;
    createDto: string;
};
type UpdateCallVarNames = BaseCallBarNames & {
    initiatorOpenUserId: string;
    updateDto: string;
    id: string;
};
type DeleteCallVarNames = BaseCallBarNames & {
    initiatorOpenUserId: string;
    id: string;
};
type GetByIdCallVarNames = BaseCallBarNames & {
    id: string;
};
type GetPaginationCallVarNames = BaseCallBarNames & {
    params: string;
};
export declare class GmModuleServiceClassCrudBySqlDynamicDomain extends GmModuleServiceClassBySqlDynamicDomain implements GmModuleServiceClassAll {
    private readonly serviceVarName;
    private readonly allCallVarNames;
    api: IGmModuleServiceApiAll;
    private readonly actionsLoggerService;
    constructor(config: GmCrudConfig, serviceVarName: string, allCallVarNames: AllCallVarNames);
    init(): void;
}
export declare class GmModuleServiceClassCreateBySqlDynamicDomain extends GmModuleServiceClassBySqlDynamicDomain implements GmModuleServiceClassCreate {
    private serviceVarName;
    private readonly callVarNames;
    api: IGmModuleServiceApiCreate;
    private readonly actionsLoggerService;
    constructor(config: GmCrudConfig, serviceVarName: string, callVarNames: CreateCallVarNames);
    init(): void;
}
export declare class GmModuleServiceClassUpdateBySqlDynamicDomain extends GmModuleServiceClassBySqlDynamicDomain implements GmModuleServiceClassUpdate {
    private readonly serviceVarName;
    private readonly callVarNames;
    api: IGmModuleServiceApiUpdate;
    private readonly actionsLoggerService;
    constructor(config: GmCrudConfig, serviceVarName: string, callVarNames: UpdateCallVarNames);
    init(): void;
}
export declare class GmModuleServiceClassDeleteBySqlDynamicDomain extends GmModuleServiceClassBySqlDynamicDomain implements GmModuleServiceClassDelete {
    private readonly serviceVarName;
    private readonly callVarNames;
    api: IGmModuleServiceApiDelete;
    private readonly actionsLoggerService;
    constructor(config: GmCrudConfig, serviceVarName: string, callVarNames: DeleteCallVarNames);
    init(): void;
}
export declare class GmModuleServiceClassGetBySqlDynamicDomain extends GmModuleServiceClassBySqlDynamicDomain implements GmModuleServiceClassGet {
    private readonly serviceVarName;
    private readonly callVarNames;
    api: IGmModuleServiceApiGet;
    constructor(config: GmCrudConfig, serviceVarName: string, callVarNames: GetByIdCallVarNames);
    init(): void;
}
export declare class GmModuleServiceClassGetAllBySqlDynamicDomain extends GmModuleServiceClassBySqlDynamicDomain implements GmModuleServiceClassGetAll {
    private readonly serviceVarName;
    private readonly callVarNames;
    api: IGmModuleServiceApiGetPagination;
    constructor(config: GmCrudConfig, serviceVarName: string, callVarNames: GetPaginationCallVarNames);
    init(): void;
}
export {};

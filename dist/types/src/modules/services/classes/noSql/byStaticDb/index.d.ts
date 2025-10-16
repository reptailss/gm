import { GmModuleServiceClassAll, GmModuleServiceClassCreate, GmModuleServiceClassDelete, GmModuleServiceClassGet, GmModuleServiceClassGetAll, GmModuleServiceClassUpdate } from "../../../interfaces/gmModuleServiceClassCurd";
import { IGmModuleServiceApiAll, IGmModuleServiceApiCreate, IGmModuleServiceApiDelete, IGmModuleServiceApiGet, IGmModuleServiceApiGetPagination, IGmModuleServiceApiUpdate } from "../../../interfaces/gmModuleServiceClassCurdApi";
import { GmCrudConfig } from "../../../../../os-core";
import { GmModuleServiceClassByNoSqlStaticDb } from "../../bases/GmModuleServiceClassByNoSqlStaticDb";
type AllCallVarNames = {
    create: CreateCallVarNames;
    update: UpdateCallVarNames;
    delete: DeleteCallVarNames;
    getById: GetByIdCallVarNames;
    getPagination: GetPaginationCallVarNames;
};
type CreateCallVarNames = {
    initiatorOpenUserId: string;
    createDto: string;
};
type UpdateCallVarNames = {
    initiatorOpenUserId: string;
    updateDto: string;
    id: string;
};
type DeleteCallVarNames = {
    initiatorOpenUserId: string;
    id: string;
};
type GetByIdCallVarNames = {
    id: string;
};
type GetPaginationCallVarNames = {
    params: string;
};
export declare class GmModuleServiceClassCrudByNoSqlStaticDb extends GmModuleServiceClassByNoSqlStaticDb implements GmModuleServiceClassAll {
    private readonly serviceVarName;
    private readonly allCallVarNames;
    api: IGmModuleServiceApiAll;
    private readonly actionsLoggerService;
    constructor(config: GmCrudConfig, serviceVarName: string, allCallVarNames: AllCallVarNames);
    init(): void;
}
export declare class GmModuleServiceClassCreateByNoSqlStaticDb extends GmModuleServiceClassByNoSqlStaticDb implements GmModuleServiceClassCreate {
    private serviceVarName;
    private readonly callVarNames;
    api: IGmModuleServiceApiCreate;
    private readonly actionsLoggerService;
    constructor(config: GmCrudConfig, serviceVarName: string, callVarNames: CreateCallVarNames);
    init(): void;
}
export declare class GmModuleServiceClassUpdateByNoSqlStaticDb extends GmModuleServiceClassByNoSqlStaticDb implements GmModuleServiceClassUpdate {
    private readonly serviceVarName;
    private readonly callVarNames;
    api: IGmModuleServiceApiUpdate;
    private readonly actionsLoggerService;
    constructor(config: GmCrudConfig, serviceVarName: string, callVarNames: UpdateCallVarNames);
    init(): void;
}
export declare class GmModuleServiceClassDeleteByNoSqlStaticDb extends GmModuleServiceClassByNoSqlStaticDb implements GmModuleServiceClassDelete {
    private readonly serviceVarName;
    private readonly callVarNames;
    api: IGmModuleServiceApiDelete;
    private readonly actionsLoggerService;
    constructor(config: GmCrudConfig, serviceVarName: string, callVarNames: DeleteCallVarNames);
    init(): void;
}
export declare class GmModuleServiceClassGetByNoSqlStaticDb extends GmModuleServiceClassByNoSqlStaticDb implements GmModuleServiceClassGet {
    private readonly serviceVarName;
    private readonly callVarNames;
    api: IGmModuleServiceApiGet;
    constructor(config: GmCrudConfig, serviceVarName: string, callVarNames: GetByIdCallVarNames);
    init(): void;
}
export declare class GmModuleServiceClassGetAllByNoSqlStaticDb extends GmModuleServiceClassByNoSqlStaticDb implements GmModuleServiceClassGetAll {
    private readonly serviceVarName;
    private readonly callVarNames;
    api: IGmModuleServiceApiGetPagination;
    constructor(config: GmCrudConfig, serviceVarName: string, callVarNames: GetPaginationCallVarNames);
    init(): void;
}
export {};

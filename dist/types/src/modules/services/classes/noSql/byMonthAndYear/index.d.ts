import { GmModuleServiceClassByNoSqlMonthAndYear } from "../../bases/GmModuleServiceClassByNoSqlMonthAndYear";
import { GmModuleServiceClassAll, GmModuleServiceClassCreate, GmModuleServiceClassGetAll } from "../../../interfaces/gmModuleServiceClassCurd";
import { IGmModuleServiceApiAll, IGmModuleServiceApiCreate, IGmModuleServiceApiGetPagination } from "../../../interfaces/gmModuleServiceClassCurdApi";
import { GmCrudConfig } from 'os-core-ts';
type AllCallVarNames = {
    create: CreateCallVarNames;
    getPagination: GetPaginationCallVarNames;
};
type CreateCallVarNames = {
    initiatorOpenUserId: string;
    createDto: string;
    month: string;
    year: string;
};
type GetPaginationCallVarNames = {
    params: string;
    dateStart: string;
    dateEnd: string;
};
export declare class GmModuleServiceClassCrudByNoSqlMonthAndYear extends GmModuleServiceClassByNoSqlMonthAndYear implements GmModuleServiceClassAll {
    private readonly serviceVarName;
    private readonly allCallVarNames;
    api: IGmModuleServiceApiAll;
    private readonly actionsLoggerService;
    constructor(config: GmCrudConfig, serviceVarName: string, allCallVarNames: AllCallVarNames);
    init(): void;
}
export declare class GmModuleServiceClassCreateByNoSqlMonthAndYear extends GmModuleServiceClassByNoSqlMonthAndYear implements GmModuleServiceClassCreate {
    private serviceVarName;
    private readonly callVarNames;
    api: IGmModuleServiceApiCreate;
    private readonly actionsLoggerService;
    constructor(config: GmCrudConfig, serviceVarName: string, callVarNames: CreateCallVarNames);
    init(): void;
}
export declare class GmModuleServiceClassGetAllByNoSqlMonthAndYear extends GmModuleServiceClassByNoSqlMonthAndYear implements GmModuleServiceClassGetAll {
    private readonly serviceVarName;
    private readonly callVarNames;
    api: IGmModuleServiceApiGetPagination;
    constructor(config: GmCrudConfig, serviceVarName: string, callVarNames: GetPaginationCallVarNames);
    init(): void;
}
export {};

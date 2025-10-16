import { GmModuleAbstractServiceClass } from "../abstract/GmModuleAbstractServiceClass";
import { GmModuleServiceClass } from "../../interfaces/gmModuleServiceClassCurd";
import { GmCrudConfig } from "../../../../os-core";
import { IGmModuleRepository } from "../../../repository/interfaces/gmModuleRepository";
export declare class GmModuleServiceClassByNoSqlStaticDb extends GmModuleAbstractServiceClass implements GmModuleServiceClass {
    private readonly repository;
    constructor(config: GmCrudConfig, className: string);
    getModuleRepository(): IGmModuleRepository;
    init(): void;
}

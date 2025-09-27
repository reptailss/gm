import { GmModuleAbstractServiceClass } from "../abstract/GmModuleAbstractServiceClass";
import { GmModuleServiceClass } from "../../interfaces/gmModuleServiceClassCurd";
import { GmCrudConfig } from 'os-core-ts';
import { IGmModuleRepository } from "../../../repository/interfaces/gmModuleRepository";
export declare class GmModuleServiceClassBySqlStaticDb extends GmModuleAbstractServiceClass implements GmModuleServiceClass {
    private readonly repository;
    constructor(config: GmCrudConfig, className: string);
    getModuleRepository(): IGmModuleRepository;
    init(): void;
}

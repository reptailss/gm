import { IGmModuleClassMethod } from "../../interfaces/gmModule";
import { GmAbstractModuleClassMethod } from "../../abstractModule/GmAbstractModuleClassMethod";
import { GmCrudConfig } from 'os-core-ts';
import { GmModuleEntity } from "../../entity/GmModuleEntity";
import { GmModuleDto } from "../../dto/GmModuleDto";
import { GmModuleCreateDto } from "../../dto/GmModuleCreateDto";
export declare class GmModuleRepositoryMethodCreate extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    private readonly repositoryVarName;
    readonly gmModuleEntity: GmModuleEntity;
    readonly gmModuleDto: GmModuleDto;
    readonly gmModuleCreateDto: GmModuleCreateDto;
    constructor(config: GmCrudConfig, repositoryVarName: string);
    getPropertyName(): string;
    init(): void;
}

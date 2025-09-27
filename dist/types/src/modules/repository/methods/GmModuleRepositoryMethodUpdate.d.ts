import { IGmModuleClassMethod } from "../../interfaces/gmModule";
import { GmAbstractModuleClassMethod } from "../../abstractModule/GmAbstractModuleClassMethod";
import { GmCrudConfig } from 'os-core-ts';
import { GmModuleEntity } from "../../entity/GmModuleEntity";
import { GmModuleDto } from "../../dto/GmModuleDto";
import { GmModuleUpdateDto } from "../../dto/GmModuleUpdateDto";
export declare class GmModuleRepositoryMethodUpdate extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    private readonly repositoryVarName;
    readonly gmModuleEntity: GmModuleEntity;
    readonly gmModuleDto: GmModuleDto;
    readonly gmModuleUpdateDto: GmModuleUpdateDto;
    constructor(config: GmCrudConfig, repositoryVarName: string);
    getPropertyName(): string;
    init(): void;
}

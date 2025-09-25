import { IGmModuleRepositoryApi } from "../interfaces/gmModuleRepositoryApi";
export declare class GmModuleRepositoryApiNoSql implements IGmModuleRepositoryApi {
    private readonly repositoryVarName;
    constructor(repositoryVarName: string);
    create(createDtoVarName: string): string;
    update(updateDtoVarName: string, props: {
        where: Record<string, string>;
        returning: boolean;
    }): string;
    destroy(props: {
        where: Record<string, string>;
    }): string;
    findOne(props: {
        where: Record<string, string>;
    }): string;
    findByPk(idVarName: string): string;
    pagination(paramsVarName: string): string;
    getConfig(): string;
    getRepositoryVarName(): string;
}

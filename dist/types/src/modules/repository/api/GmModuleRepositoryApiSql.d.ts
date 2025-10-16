import { IGmModuleRepositoryApi } from "../interfaces/gmModuleRepositoryApi";
export declare class GmModuleRepositoryApiSql implements IGmModuleRepositoryApi {
    private readonly repositoryVarName;
    constructor(repositoryVarName: string);
    create(createDtoVarName: string): string;
    update(updateDtoVarName: string, props: {
        where: Record<string, string>;
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

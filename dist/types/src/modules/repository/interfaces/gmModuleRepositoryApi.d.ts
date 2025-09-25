export interface IGmModuleRepositoryApi {
    create(createDtoVarName: string): string;
    update(updateDtoVarName: string, props: {
        where: Record<string, string>;
        returning: boolean;
    }): string;
    destroy(props: {
        where: Record<string, string>;
    }): string;
    findOne(option: {
        where: Record<string, string>;
    }): string;
    findByPk(idVarName: string): string;
    pagination(paramsVarName: string): string;
    getConfig(): string;
    getRepositoryVarName(): string;
}

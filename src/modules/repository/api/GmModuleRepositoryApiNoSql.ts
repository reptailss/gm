import {IGmModuleRepositoryApi} from '@modules/repository/interfaces/gmModuleRepositoryApi'
import {GmObjectStringifyHelper} from '@helpers/GmObjectStringifyHelper'


export class GmModuleRepositoryApiNoSql implements IGmModuleRepositoryApi {
    
    private readonly repositoryVarName: string
    
    constructor(repositoryVarName: string) {
        this.repositoryVarName = repositoryVarName
    }
    
    
    public create(createDtoVarName: string): string {
        return `${this.repositoryVarName}.create(${createDtoVarName})`
    }
    
    public update(updateDtoVarName: string, props: {
        where: Record<string, string>
        returning: boolean
    }): string {
        return `${this.repositoryVarName}.update(${updateDtoVarName},
                     {
                           where:${GmObjectStringifyHelper.objectOptionsToString(props.where)},
                           returning:}
                      },
                      ${props.returning ? 'true' : 'false'}
                )`
    }
    
    public destroy(props: {
        where: Record<string, string>,
    }): string {
        
        return `${this.repositoryVarName}.destroy({
                           where:${GmObjectStringifyHelper.objectOptionsToString(props.where)}
                      })`
    }
    
    public findOne(props: {
        where: Record<string, string>
    }): string {
        return `${this.repositoryVarName}.findOne({
                           where:${GmObjectStringifyHelper.objectOptionsToString(props.where)}
                      })`
    }
    
    public findByPk(idVarName: string): string {
        return `${this.repositoryVarName}.findByPk(${idVarName})`
    }
    
    public pagination(paramsVarName: string): string {
        return `${this.repositoryVarName}.pagination(${paramsVarName})`
    }
    
    
    public getConfig(): string {
        return `${this.repositoryVarName}.getConfig()`
    }
    
    public getRepositoryVarName(): string {
        return this.repositoryVarName
    }
    
}




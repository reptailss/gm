import {GmModuleAbstractServiceClass} from '@modules/services/classes/abstract/GmModuleAbstractServiceClass'
import {IGmModuleClass, IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmModuleRepositoryByNoSqlMonthAndYear} from '@modules/repository/GmModuleRepositoryByNoSqlMonthAndYear'
import {GmCrudConfig} from 'os-core-ts'
import {IGmModuleRepository} from '@modules/repository/interfaces/gmModuleRepository'
import {GmInjectableDec} from '@decorators/controllerDecorators/GmInjectableDec'


const PROP_NAMES = {
    repository: 'repository',
    loaderRepository: 'loaderRepository',
    month: 'month',
    year: 'year',
} as const


export class GmModuleServiceClassByNoSqlMonthAndYear extends GmModuleAbstractServiceClass implements IGmModuleClass {
    
    private readonly gmModuleRepositoryByNoSqlMonthAndYear: GmModuleRepositoryByNoSqlMonthAndYear
    
    constructor(
        config: GmCrudConfig,
        className: string,
    ) {
        super(config, className)
        this.gmModuleRepositoryByNoSqlMonthAndYear = new GmModuleRepositoryByNoSqlMonthAndYear(config, {
            repositoryVarName: PROP_NAMES.repository,
            loaderRepositoryVarName: `this.${PROP_NAMES.loaderRepository}`,
            monthVarName: PROP_NAMES.month,
            yearVarName: PROP_NAMES.year,
        })
    }
    
    public getModuleRepository(): IGmModuleRepository {
        return this.gmModuleRepositoryByNoSqlMonthAndYear
    }
    
    public getLoaderRepositoryVarName():string {
        return  `this.${PROP_NAMES.loaderRepository}`
    }
    
    public addAndInitMethod(method: IGmModuleClassMethod, monthVarName: string, yearVarName: string): this {
        method.prependBodyElement({
            name: 'init repository',
            value: this.renderInitRepository(),
        })
        method.addProp({
            varName: PROP_NAMES.month,
            callVarName: monthVarName,
            decorator: null,
            type: 'number',
        })
        method.addProp({
            varName: PROP_NAMES.year,
            callVarName: yearVarName,
            decorator: null,
            type: 'number',
        })
        method.setPropsType('object')
        
        this.addMethod(method)
        return this
    }
    
    public renderInitRepository() {
        return `const ${PROP_NAMES.repository} = await ${this.gmModuleRepositoryByNoSqlMonthAndYear.getInitRepository()}`
    }
    
    
    public init(): void {
        
        this.addModule(this.gmModuleRepositoryByNoSqlMonthAndYear)
        
        this.addConstructorProp({
            varName: PROP_NAMES.loaderRepository,
            type: this.gmModuleRepositoryByNoSqlMonthAndYear.getPropertyName(),
            defaultValue: null,
            privateReadOnly: true,
        })
        this.addDecorator(new GmInjectableDec())
    }
    
}
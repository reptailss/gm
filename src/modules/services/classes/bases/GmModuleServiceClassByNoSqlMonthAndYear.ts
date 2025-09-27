import {GmModuleAbstractServiceClass} from '@modules/services/classes/abstract/GmModuleAbstractServiceClass'
import {IGmModuleClass, IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmModuleRepositoryByNoSqlMonthAndYear} from '@modules/repository/GmModuleRepositoryByNoSqlMonthAndYear'
import {GmModuleEntityType} from '@modules/repository/GmModuleEntityType'
import {GmServiceDateHelper} from '@services/dateHelper/GmServiceDateHelper'
import {GmCrudConfig} from 'os-core-ts'
import {IGmModuleRepository} from '@modules/repository/interfaces/gmModuleRepository'
import {GmInjectableDec} from '@decorators/controllerDecorators/GmInjectableDec'


const PROP_NAMES = {
    repository: 'repository',
    getRepositoryCb: 'loaderRepository',
    month: 'month',
    year: 'year',
} as const


export class GmModuleServiceClassByNoSqlMonthAndYear extends GmModuleAbstractServiceClass implements IGmModuleClass {

    private readonly repository: GmModuleRepositoryByNoSqlMonthAndYear
    private readonly entityType: GmModuleEntityType

    constructor(
        config: GmCrudConfig,
        className: string,
    ) {
        super(config, className)
        this.repository = new GmModuleRepositoryByNoSqlMonthAndYear(config, {
            repositoryVarName: PROP_NAMES.repository,
            getRepositoryCbVarName: `this.${PROP_NAMES.getRepositoryCb}`,
            monthVarName: PROP_NAMES.month,
            yearVarName: PROP_NAMES.year,
        })
        this.entityType = new GmModuleEntityType(config)
    }

    public getModuleRepository(): IGmModuleRepository {
        return this.repository
    }

    public addAndInitMethod(method: IGmModuleClassMethod,monthVarName:string,yearVarName:string): this {
        method.prependBodyElement({
            name: 'init repository',
            value: this.renderInitRepository(),
        })
        method.addProp({
            varName: PROP_NAMES.year,
            callVarName: monthVarName,
            decorator: null,
            type: 'number',
        })
        method.addProp({
            varName: PROP_NAMES.month,
            callVarName: yearVarName,
            decorator: null,
            type: 'number',
        })
        method.setPropsType('object')

        this.addMethod(method)
        return this
    }

    public renderInitRepository(){
        return `const ${PROP_NAMES.repository} = await ${this.repository.getInitRepository()}`
    }


    public init(): void {

        this.addModule(this.repository)
        this.addModule(this.entityType)

        this.addConstructorProp({
            varName: PROP_NAMES.getRepositoryCb,
            type: this.entityType.getPropertyName(),
            defaultValue: this.repository.getPropertyName(),
            privateReadOnly: true,
        })
        this.addDecorator(new GmInjectableDec())
    }

}
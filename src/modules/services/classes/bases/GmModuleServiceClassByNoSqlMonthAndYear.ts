import {GmModuleAbstractServiceClass} from '@modules/services/classes/abstract/GmModuleAbstractServiceClass'
import {IGmModuleClass, IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmModuleModelByNoSqlMonthAndYear} from '@modules/model/GmModuleModelByNoSqlMonthAndYear'
import {GmModuleModelType} from '@modules/model/GmModuleModelType'
import {GmServiceDateHelper} from '@services/dateHelper/GmServiceDateHelper'
import {GmConfig} from '@config/types'
import {IGmModuleModel} from '@modules/model/interfaces/gmModuleModel'


const PROP_NAMES = {
    model: 'model',
    getModelCb: 'getModelCb',
    month: 'month',
    year: 'year',
} as const


export class GmModuleServiceClassByNoSqlMonthAndYear extends GmModuleAbstractServiceClass implements IGmModuleClass {

    private readonly model: GmModuleModelByNoSqlMonthAndYear
    private readonly modelType: GmModuleModelType
    private readonly gmServiceDateHelper: GmServiceDateHelper

    constructor(
        config: GmConfig,
        className: string,
    ) {
        super(config, className)
        this.model = new GmModuleModelByNoSqlMonthAndYear(config, {
            modelVarName: PROP_NAMES.model,
            getModelCbVarName: `this.${PROP_NAMES.getModelCb}`,
            monthVarName: PROP_NAMES.month,
            yearVarName: PROP_NAMES.year,
        })
        this.modelType = new GmModuleModelType(config)
        this.gmServiceDateHelper = new GmServiceDateHelper()
    }

    public getModuleModel(): IGmModuleModel {
        return this.model
    }

    public addAndInitMethod(method: IGmModuleClassMethod,monthVarName:string,yearVarName:string): this {
        method.prependBodyElement({
            name: 'init model',
            value: this.renderInitModel(),
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

    public renderInitModel(){
        return `const ${PROP_NAMES.model} = await ${this.model.getInitModel()}`
    }


    public init(): void {

        this.addModule(this.model)
        this.addModule(this.modelType)

        this.addConstructorProp({
            varName: PROP_NAMES.getModelCb,
            type: this.modelType.getPropertyName(),
            defaultValue: this.model.getPropertyName(),
            privateReadOnly: true,
        })
    }

}
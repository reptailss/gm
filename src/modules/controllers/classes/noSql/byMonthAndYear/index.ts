import {GmCrudConfig} from 'os-core-ts'
import {StringCaseHelper} from '@helpers/StringCaseHelper'
import {GmCrudConfigChecker} from '@crudConfig/GmCrudConfigChecker'
import {GmAccessStructureMethodProcessor} from '@modules/structure/GmAccessStructureMethodProcessor'
import {IGmModuleClass, IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmQueryParamDateDec, GmQueryParamNumDec} from '@decorators/controllerDecorators/GmQueryParamDec'
import {GmServiceValidator} from '@services/validator/GmServiceValidator'
import {GmServiceSchemaValidatorType} from '@services/schemaValidator/GmServiceSchemaValidatorType'
import {GmModuleValidator} from '@modules/validator/GmModuleValidator'
import {GmModuleAbstractControllerClass} from '@modules/controllers/classes/abstract/GmModuleAbstractControllerClass'
import {
    GmModuleServiceClassCreateByNoSqlMonthAndYear,
    GmModuleServiceClassCrudByNoSqlMonthAndYear, GmModuleServiceClassGetAllByNoSqlMonthAndYear,
} from '@modules/services/classes/noSql/byMonthAndYear'
import {GmServiceDateHelper} from '@services/dateHelper/GmServiceDateHelper'
import {GmModuleCreateDto} from '@modules/dto/GmModuleCreateDto'
import {GmModuleControllerMethodCreate} from '@modules/controllers/methods/GmModuleControllerMethodCreate'
import {GmModuleControllerMethodGetPagination} from '@modules/controllers/methods/GmModuleControllerMethodGetPagination'


class GmGetVarNamesByMonthAndYear {
    constructor(private readonly config: GmCrudConfig) {
    }

    public userDto() {
        return 'userDto'
    }

    public add() {
        const createBody = 'body'
        return {
            openUserId: `${this.userDto()}.open_user_id`,
            createBody,
            createBodySchema: `create${StringCaseHelper.toPascalCase(this.config.dtoName.singular)}BodySchema`,
            legalEntityId: `${createBody}.legal_entity_id`,
            createBodyType: !GmCrudConfigChecker.hasStructureAccess(this.config, 'add') ||
            GmCrudConfigChecker.hasStructureAccess(this.config, 'add') && this.checkHasLeIdColumn()
                ? undefined : `Create${StringCaseHelper.toPascalCase(this.config.dtoName.singular)}Body`,
        }
    }

    public update() {
        const updateBody = 'body'
        return {
            updateBody,
            updateBodySchema: `update${StringCaseHelper.toPascalCase(this.config.dtoName.singular)}BodySchema`,
            id: 'id',
            openUserId: `${this.userDto()}.open_user_id`,
            legalEntityId: `${updateBody}.legal_entity_id`,
            updateBodyType: GmCrudConfigChecker.hasStructureAccess(this.config, 'update') ? `Update${StringCaseHelper.toPascalCase(this.config.dtoName.singular)}Body` : undefined,
        }
    }

    public delete() {
        return {
            id: 'id',
            openUserId: `${this.userDto()}.open_user_id`,
            legalEntityId: 'legalEntityId',

        }
    }

    public get() {
        return {
            id: 'id',
            openUserId: `${this.userDto()}.open_user_id`,
            legalEntityId: 'legalEntityId',
        }
    }

    public list() {
        return {
            params: 'params',
            dateStart: 'dateStart',
            dateEnd: 'dateEnd',
            paramsSchema: `${StringCaseHelper.toCamelCase(this.config.dtoName.singular)}DtoPaginationQueryParamsSchema`,
            openUserId: `${this.userDto()}.open_user_id`,
            legalEntityId: 'legalEntityId',
        }
    }

    public checkHasLeIdColumn(): boolean {
        return 'legal_entity_id' in this.config.repository.columns &&
            (
                this.config.repository.columns.legal_entity_id.type === 'INTEGER' ||
                this.config.repository.columns.legal_entity_id.type === 'BIGINT'
            )
    }

}

class GmAccessStructureMethodProcessorByMonthAndYear extends GmAccessStructureMethodProcessor {

    constructor(config: GmCrudConfig) {
        const gmGetVarNames = new GmGetVarNamesByMonthAndYear(config)
        super(config, {
            add: {
                openUserId: gmGetVarNames.add().openUserId,
                legalEntityId: gmGetVarNames.add().legalEntityId,
            },
            update: {
                openUserId: gmGetVarNames.update().openUserId,
                legalEntityId: gmGetVarNames.update().legalEntityId,
            },
            delete: {
                openUserId: gmGetVarNames.delete().openUserId,
                legalEntityId: gmGetVarNames.delete().legalEntityId,
            },
            get: {
                openUserId: gmGetVarNames.get().openUserId,
                legalEntityId: gmGetVarNames.get().legalEntityId,
            },
            list: {
                openUserId: gmGetVarNames.list().openUserId,
                legalEntityId: gmGetVarNames.list().legalEntityId,
            },
        })
    }

    public list(method: IGmModuleClassMethod) {
        super.list(method)
        method.appendPropDecorator({
            decorator: new GmQueryParamNumDec('legal_entity_id'),
            type: 'number',
            varName: 'legalEntityId',
        })

    }
}


class GmValidatorBuilderByMonthAndYear {

    private readonly gmGetVarNames: GmGetVarNamesByMonthAndYear
    private readonly gmServiceValidator: GmServiceValidator
    private readonly gmServiceSchemaValidatorType: GmServiceSchemaValidatorType

    constructor(
        private readonly config: GmCrudConfig,
        private readonly validatorVarName: string,
        private readonly validator: GmModuleValidator,
    ) {
        this.gmGetVarNames = new GmGetVarNamesByMonthAndYear(config)
        this.gmServiceValidator = new GmServiceValidator()
        this.gmServiceSchemaValidatorType = new GmServiceSchemaValidatorType()
    }


    public initValidator(): string {
        return `const ${this.validatorVarName} = new ${this.validator.getPropertyName()}()`
    }

    public add() {
        const schemaTypeStr = this.gmGetVarNames.add().createBodyType ? ` :${this.gmServiceSchemaValidatorType.getSchemaValidatorType(this.gmGetVarNames.add().createBodyType || '')}` : ''
        if (!GmCrudConfigChecker.hasStructureAccess(this.config, 'add')) {
            return `const ${this.gmGetVarNames.add().createBodySchema}${schemaTypeStr} = ${this.validator.api.getCreateDtoSchema()}`
        }
        if (this.gmGetVarNames.checkHasLeIdColumn()) {
            return `const ${this.gmGetVarNames.add().createBodySchema}${schemaTypeStr} = ${this.validator.api.getCreateDtoSchema()}`
        }
        return `const ${this.gmGetVarNames.add().createBodySchema}${schemaTypeStr} = ${this.validator.api.getCreateDtoSchema()}.merge(${this.gmServiceValidator.object({
            legal_entity_id: this.gmServiceValidator.number(),
        })})`
    }

    public list() {
        return `const ${this.gmGetVarNames.list().paramsSchema} = ${this.validator.api.getDtoPaginationQueryParamsSchema()}`
    }

    public checkHasAddValidatorService(type: 'add') {
        return GmCrudConfigChecker.hasStructureAccess(this.config, type) && !this.gmGetVarNames.checkHasLeIdColumn()
    }


}

export class GmModuleControllerClassCrudByNoSqlMonthAndYear extends GmModuleAbstractControllerClass implements IGmModuleClass {


    private readonly validator: GmModuleValidator
    private readonly serviceCrud: GmModuleServiceClassCrudByNoSqlMonthAndYear
    private readonly gmServiceDateHelper: GmServiceDateHelper
    private readonly gmGetVarNames: GmGetVarNamesByMonthAndYear
    private readonly gmAccessStructureMethodProcessorByMonthAndYear: GmAccessStructureMethodProcessorByMonthAndYear
    private readonly gmValidatorBuilder: GmValidatorBuilderByMonthAndYear
    private readonly gmModuleCreateDto: GmModuleCreateDto

    constructor(config: GmCrudConfig,
    ) {
        super(
            config,
            `${StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`,
        )
        this.gmServiceDateHelper = new GmServiceDateHelper()
        this.validator = new GmModuleValidator(
            config,
            this.getValidatorVarName(),
        )
        this.gmValidatorBuilder = new GmValidatorBuilderByMonthAndYear(
            config,
            this.getValidatorVarName(),
            this.validator,
        )
        const gmGetVarNames = new GmGetVarNamesByMonthAndYear(config)

        this.serviceCrud = new GmModuleServiceClassCrudByNoSqlMonthAndYear(
            config,
            `this.${this.getServiceVarName()}`,
            {
                create: {
                    createDto: gmGetVarNames.add().createBody,
                    initiatorOpenUserId: gmGetVarNames.add().openUserId,
                    month: this.gmServiceDateHelper.getCurrentMonth(),
                    year: this.gmServiceDateHelper.getCurrentYear(),
                },
                getPagination: {
                    params: gmGetVarNames.list().params,
                    dateStart: gmGetVarNames.list().dateStart,
                    dateEnd: gmGetVarNames.list().dateEnd,
                },
            },
        )
        this.gmAccessStructureMethodProcessorByMonthAndYear = new GmAccessStructureMethodProcessorByMonthAndYear(config)
        this.gmGetVarNames = gmGetVarNames
        this.gmModuleCreateDto = new GmModuleCreateDto(config)
    }

    public init(): void {
        super.init()
        this.addModule(this.validator)
        this.addModule(this.serviceCrud)
        this.addService(this.gmServiceDateHelper)

        if (
            this.gmValidatorBuilder.checkHasAddValidatorService('add')
        ) {
            this.addService(new GmServiceValidator())
            this.addService(new GmServiceSchemaValidatorType())
            this.addModule(this.gmModuleCreateDto)
        }

        const methodCreate = new GmModuleControllerMethodCreate(
            this.getConfig(),
            this.serviceCrud.api,
            {
                createDto: this.gmGetVarNames.add().createBody,
                createDtoType: this.gmGetVarNames.add().createBodyType,
                userDto: this.gmGetVarNames.userDto(),
                createDtoSchema: this.gmGetVarNames.add().createBodySchema,
            },
        )
        if (GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'add')) {
            this.gmAccessStructureMethodProcessorByMonthAndYear.add(methodCreate)
        }
        const methodPagination = new GmModuleControllerMethodGetPagination(
            this.getConfig(),
            this.serviceCrud.api,
            {
                params: this.gmGetVarNames.list().params,
                userDto: this.gmGetVarNames.userDto(),
                paramsSchema: this.gmGetVarNames.list().paramsSchema,
            },
        ).addProp({
            type: 'Date',
            varName: this.gmGetVarNames.list().dateStart,
            callVarName: this.gmGetVarNames.list().dateStart,
            decorator: new GmQueryParamDateDec('date_start'),
        }).addProp({
            type: 'Date',
            varName: this.gmGetVarNames.list().dateEnd,
            callVarName: this.gmGetVarNames.list().dateEnd,
            decorator: new GmQueryParamDateDec('date_end'),
        })
        if (GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'list')) {
            this.gmAccessStructureMethodProcessorByMonthAndYear.list(methodPagination)
        }
        this.addMethod(methodCreate)
        this.addMethod(methodPagination)
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        })

        if (this.gmGetVarNames.add().createBodyType) {
            this.addElementBeforeClass(`
                type ${this.gmGetVarNames.add().createBodyType} = ${this.gmModuleCreateDto.getPropertyName()} & {legal_entity_id:number}
            `)
        }

        this.addElementBeforeClass(`
            ${this.gmValidatorBuilder.initValidator()}
             
            ${this.gmValidatorBuilder.add()}
              
            ${this.gmValidatorBuilder.list()}
        `)
    }

    private getValidatorVarName() {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`
    }

    private getServiceVarName(): string {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.singular)}Service`
    }
}


export class GmModuleControllerClassCreateByNoSqlMonthAndYear extends GmModuleAbstractControllerClass implements IGmModuleClass {


    private readonly validator: GmModuleValidator
    private readonly serviceCrud: GmModuleServiceClassCreateByNoSqlMonthAndYear
    private readonly gmServiceDateHelper: GmServiceDateHelper
    private readonly gmGetVarNames: GmGetVarNamesByMonthAndYear
    private readonly gmAccessStructureMethodProcessorByMonthAndYear: GmAccessStructureMethodProcessorByMonthAndYear
    private readonly gmValidatorBuilder: GmValidatorBuilderByMonthAndYear
    private readonly gmModuleCreateDto: GmModuleCreateDto

    constructor(config: GmCrudConfig,
    ) {
        super(
            config,
            `Create${StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`,
        )
        this.gmServiceDateHelper = new GmServiceDateHelper()
        this.validator = new GmModuleValidator(
            config,
            this.getValidatorVarName(),
        )
        this.gmValidatorBuilder = new GmValidatorBuilderByMonthAndYear(
            config,
            this.getValidatorVarName(),
            this.validator,
        )
        const gmGetVarNames = new GmGetVarNamesByMonthAndYear(config)
        this.serviceCrud = new GmModuleServiceClassCreateByNoSqlMonthAndYear(
            config,
            `this.${this.getServiceVarName()}`,
            {
                createDto: gmGetVarNames.add().createBody,
                initiatorOpenUserId: gmGetVarNames.add().openUserId,
                month: this.gmServiceDateHelper.getCurrentMonth(),
                year: this.gmServiceDateHelper.getCurrentYear(),
            },
        )

        this.gmAccessStructureMethodProcessorByMonthAndYear = new GmAccessStructureMethodProcessorByMonthAndYear(config)
        this.gmGetVarNames = gmGetVarNames
        this.gmModuleCreateDto = new GmModuleCreateDto(config)

    }

    public init(): void {
        super.init()
        this.addModule(this.validator)
        this.addModule(this.serviceCrud)
        this.addService(this.gmServiceDateHelper)

        if (
            this.gmValidatorBuilder.checkHasAddValidatorService('add')
        ) {
            this.addService(new GmServiceValidator())
            this.addService(new GmServiceSchemaValidatorType())
            this.addModule(this.gmModuleCreateDto)
        }

        const methodCreate = new GmModuleControllerMethodCreate(
            this.getConfig(),
            this.serviceCrud.api,
            {
                createDto: this.gmGetVarNames.add().createBody,
                createDtoType: this.gmGetVarNames.add().createBodyType,
                userDto: this.gmGetVarNames.userDto(),
                createDtoSchema: this.gmGetVarNames.add().createBodySchema,
            },
        )
        if (GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'add')) {
            this.gmAccessStructureMethodProcessorByMonthAndYear.add(methodCreate)
        }
        this.addMethod(methodCreate)

        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        })

        if (this.gmGetVarNames.add().createBodyType) {
            this.addElementBeforeClass(`
                type ${this.gmGetVarNames.add().createBodyType} = ${this.gmModuleCreateDto.getPropertyName()} & {legal_entity_id:number}
            `)
        }

        this.addElementBeforeClass(`
            ${this.gmValidatorBuilder.initValidator()}
             
            ${this.gmValidatorBuilder.add()}
        `)
    }

    private getValidatorVarName() {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`
    }

    private getServiceVarName(): string {
        return `create${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`
    }
}


export class GmModuleControllerClassGetAllByNoSqlMonthAndYear extends GmModuleAbstractControllerClass implements IGmModuleClass {


    private readonly validator: GmModuleValidator
    private readonly serviceCrud: GmModuleServiceClassGetAllByNoSqlMonthAndYear
    private readonly gmGetVarNames: GmGetVarNamesByMonthAndYear
    private readonly gmAccessStructureMethodProcessorByMonthAndYear: GmAccessStructureMethodProcessorByMonthAndYear
    private readonly gmValidatorBuilder: GmValidatorBuilderByMonthAndYear

    constructor(config: GmCrudConfig,
    ) {
        super(
            config,
            `GetAll${StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`,
        )
        this.validator = new GmModuleValidator(
            config,
            this.getValidatorVarName(),
        )
        this.gmValidatorBuilder = new GmValidatorBuilderByMonthAndYear(
            config,
            this.getValidatorVarName(),
            this.validator,
        )
        const gmGetVarNames = new GmGetVarNamesByMonthAndYear(config)
        this.serviceCrud = new GmModuleServiceClassGetAllByNoSqlMonthAndYear(
            config,
            `this.${this.getServiceVarName()}`,
            {
                params: gmGetVarNames.list().params,
                dateStart: gmGetVarNames.list().dateStart,
                dateEnd: gmGetVarNames.list().dateEnd,
            },
        )
        this.gmAccessStructureMethodProcessorByMonthAndYear = new GmAccessStructureMethodProcessorByMonthAndYear(config)
        this.gmGetVarNames = gmGetVarNames

    }

    public init(): void {
        super.init()
        this.addModule(this.validator)
        this.addModule(this.serviceCrud)

        const methodPagination = new GmModuleControllerMethodGetPagination(
            this.getConfig(),
            this.serviceCrud.api,
            {
                params: this.gmGetVarNames.list().params,
                userDto: this.gmGetVarNames.userDto(),
                paramsSchema: this.gmGetVarNames.list().paramsSchema,
            },
        ).addProp({
            type: 'Date',
            varName: this.gmGetVarNames.list().dateStart,
            callVarName: this.gmGetVarNames.list().dateStart,
            decorator: new GmQueryParamDateDec('date_start'),
        }).addProp({
            type: 'Date',
            varName: this.gmGetVarNames.list().dateEnd,
            callVarName: this.gmGetVarNames.list().dateEnd,
            decorator: new GmQueryParamDateDec('date_end'),
        })
        if (GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'list')) {
            this.gmAccessStructureMethodProcessorByMonthAndYear.list(methodPagination)
        }
        this.addMethod(methodPagination)

        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        })

        this.addElementBeforeClass(`
            ${this.gmValidatorBuilder.initValidator()}
             
            ${this.gmValidatorBuilder.list()}
        `)
    }

    private getValidatorVarName() {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`
    }

    private getServiceVarName(): string {
        return `getAll${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`
    }
}
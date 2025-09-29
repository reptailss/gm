import {GmAccessStructureMethodProcessor} from '@modules/structure/GmAccessStructureMethodProcessor'
import {GmCrudConfig} from 'os-core-ts'
import {GmModuleAbstractControllerClass} from '@modules/controllers/classes/abstract/GmModuleAbstractControllerClass'
import {IGmModuleClass} from '@modules/interfaces/gmModule'
import {GmModuleValidator} from '@modules/validator/GmModuleValidator'
import {
    GmModuleServiceClassCreateBySqlDynamicLeId,
    GmModuleServiceClassCrudBySqlDynamicLeId,
    GmModuleServiceClassDeleteBySqlDynamicLeId,
    GmModuleServiceClassGetAllBySqlDynamicLeId,
    GmModuleServiceClassGetBySqlDynamicLeId,
    GmModuleServiceClassUpdateBySqlDynamicLeId,
} from '@modules/services/classes/sql/byDynamicLeId'
import {GmModuleCreateDto} from '@modules/dto/GmModuleCreateDto'
import {GmModuleUpdateDto} from '@modules/dto/GmModuleUpdateDto'
import {StringCaseHelper} from '@helpers/StringCaseHelper'
import {GmModuleControllerMethodCreate} from '@modules/controllers/methods/GmModuleControllerMethodCreate'
import {GmCrudConfigChecker} from '@crudConfig/GmCrudConfigChecker'
import {GmModuleControllerMethodUpdate} from '@modules/controllers/methods/GmModuleControllerMethodUpdate'
import {GmModuleControllerMethodDelete} from '@modules/controllers/methods/GmModuleControllerMethodDelete'
import {GmQueryParamNumDec} from '@decorators/controllerDecorators/GmQueryParamDec'
import {GmModuleControllerMethodGetById} from '@modules/controllers/methods/GmModuleControllerMethodGetById'
import {GmModuleControllerMethodGetPagination} from '@modules/controllers/methods/GmModuleControllerMethodGetPagination'
import {GmBodyParamNumDec} from '@decorators/controllerDecorators/GmBodyParamDec'


const CREATE_VAR_NAMES = {
    body: 'body',
    createDtoSchema: 'createDtoSchema',
    userDto: 'userDto',
    legalEntityId: 'legalEntityId',
} as const

const UPDATE_VAR_NAMES = {
    body: 'body',
    updateDtoSchema: 'createDtoSchema',
    userDto: 'userDto',
    id: 'id',
    legalEntityId: 'legalEntityId',
} as const

const DELETE_VAR_NAMES = {
    legalEntityId: 'legalEntityId',
    userDto: 'userDto',
    id: 'id',
} as const

const GET_VAR_NAMES = {
    legalEntityId: 'legalEntityId',
    userDto: 'userDto',
    id: 'id',
} as const

const GET_ALL_VAR_NAMES = {
    legalEntityId: 'legalEntityId',
    params: 'params',
    userDto: 'userDto',
} as const


class GmAccessStructureMethodProcessorByDynamicLeId extends GmAccessStructureMethodProcessor {
    constructor(config: GmCrudConfig) {
        const hasLeIdColumn = 'legal_entity_id' in config.repository.columns
        super(config, {
            add: {
                openUserId: `${CREATE_VAR_NAMES.userDto}.open_user_id`,
                legalEntityId: hasLeIdColumn ? `${CREATE_VAR_NAMES.body}.legal_entity_id` : CREATE_VAR_NAMES.legalEntityId,
            },
            update: {
                openUserId: `${UPDATE_VAR_NAMES.userDto}.open_user_id`,
                legalEntityId: hasLeIdColumn ? `${UPDATE_VAR_NAMES.body}.legal_entity_id` : UPDATE_VAR_NAMES.legalEntityId,
            },
            delete: {
                openUserId: `${DELETE_VAR_NAMES.userDto}.open_user_id`,
                legalEntityId: DELETE_VAR_NAMES.legalEntityId,
            },
            get: {
                openUserId: `${GET_VAR_NAMES.userDto}.open_user_id`,
                legalEntityId: GET_VAR_NAMES.legalEntityId,
            },
            list: {
                openUserId: `${GET_ALL_VAR_NAMES.userDto}.open_user_id`,
                legalEntityId: GET_ALL_VAR_NAMES.legalEntityId,
            },
        })
    }
}

export class GmModuleControllerClassCrudBySqlDynamicLeId extends GmModuleAbstractControllerClass implements IGmModuleClass {
    
    
    private readonly validator: GmModuleValidator
    private readonly serviceCrud: GmModuleServiceClassCrudBySqlDynamicLeId
    private readonly gmModuleCreateDto: GmModuleCreateDto
    private readonly gmModuleUpdateDto: GmModuleUpdateDto
    private readonly gmAccessStructureMethodProcessorByDynamicLeId: GmAccessStructureMethodProcessorByDynamicLeId
    
    constructor(config: GmCrudConfig,
    ) {
        super(
            config,
            `${StringCaseHelper.toPascalCase(config.dtoName.plural)}Controller`,
        )
        this.validator = new GmModuleValidator(
            config
        )
        const hasLeIdColumn = 'legal_entity_id' in this.getConfig().repository.columns
        this.serviceCrud = new GmModuleServiceClassCrudBySqlDynamicLeId(
            config,
            `this.${this.getServiceVarName()}`,
            {
                create: {
                    legalEntityId: hasLeIdColumn ? `${CREATE_VAR_NAMES.body}.legal_entity_id` : CREATE_VAR_NAMES.legalEntityId,
                    createDto: CREATE_VAR_NAMES.body,
                    initiatorOpenUserId: `${CREATE_VAR_NAMES.userDto}.open_user_id`,
                },
                update: {
                    legalEntityId: hasLeIdColumn ? `${UPDATE_VAR_NAMES.body}.legal_entity_id` : UPDATE_VAR_NAMES.legalEntityId,
                    id: UPDATE_VAR_NAMES.id,
                    updateDto: UPDATE_VAR_NAMES.body,
                    initiatorOpenUserId: `${UPDATE_VAR_NAMES.userDto}.open_user_id`,
                },
                delete: {
                    legalEntityId: DELETE_VAR_NAMES.legalEntityId,
                    id: DELETE_VAR_NAMES.id,
                    initiatorOpenUserId: `${DELETE_VAR_NAMES.userDto}.open_user_id`,
                },
                getById: {
                    legalEntityId: GET_VAR_NAMES.legalEntityId,
                    id: GET_VAR_NAMES.id,
                },
                getPagination: {
                    legalEntityId: GET_ALL_VAR_NAMES.legalEntityId,
                    params: GET_ALL_VAR_NAMES.params,
                },
            },
        )
        this.gmModuleCreateDto = new GmModuleCreateDto(config)
        this.gmModuleUpdateDto = new GmModuleUpdateDto(config)
        this.gmAccessStructureMethodProcessorByDynamicLeId = new GmAccessStructureMethodProcessorByDynamicLeId(config)
        
    }
    
    public init(): void {
        super.init()
        this.addModule(this.validator)
        this.addModule(this.serviceCrud)
        this.addModule(this.gmModuleCreateDto)
        this.addModule(this.gmModuleUpdateDto)
        
        const hasLeIdColumn = 'legal_entity_id' in this.getConfig().repository.columns
        const methodCreate = new GmModuleControllerMethodCreate(
            this.getConfig(),
            this.serviceCrud.api,
            {
                createDto: CREATE_VAR_NAMES.body,
                userDto: CREATE_VAR_NAMES.userDto,
                createDtoSchema: this.getValidatorCreateBodyVarName(),
            },
        )
        if (!hasLeIdColumn) {
            methodCreate.addProp({
                type: 'number',
                varName: CREATE_VAR_NAMES.legalEntityId,
                callVarName: CREATE_VAR_NAMES.legalEntityId,
                decorator: new GmBodyParamNumDec('legal_entity_id'),
            })
        }
        if (GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'add')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.add(methodCreate)
        }
        const methodUpdate = new GmModuleControllerMethodUpdate(
            this.getConfig(),
            this.serviceCrud.api,
            {
                updateDto: UPDATE_VAR_NAMES.body,
                userDto: UPDATE_VAR_NAMES.userDto,
                updateDtoSchema: this.getValidatorUpdateBodyVarName(),
                id: UPDATE_VAR_NAMES.id,
            },
        )
        if (!hasLeIdColumn) {
            methodUpdate.addProp({
                type: 'number',
                varName: UPDATE_VAR_NAMES.legalEntityId,
                callVarName: UPDATE_VAR_NAMES.legalEntityId,
                decorator: new GmBodyParamNumDec('legal_entity_id'),
            })
        }
        if (GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'update')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.update(methodUpdate)
        }
        const methodDelete = new GmModuleControllerMethodDelete(
            this.getConfig(),
            this.serviceCrud.api,
            {
                userDto: DELETE_VAR_NAMES.userDto,
                id: DELETE_VAR_NAMES.id,
            },
        ).addProp({
            varName: DELETE_VAR_NAMES.legalEntityId,
            callVarName: DELETE_VAR_NAMES.legalEntityId,
            type: 'number',
            decorator: new GmQueryParamNumDec('legal_entity_id'),
        })
        if (GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'delete')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.delete(methodDelete)
        }
        const methodGetById = new GmModuleControllerMethodGetById(
            this.getConfig(),
            this.serviceCrud.api,
            {
                userDto: GET_VAR_NAMES.userDto,
                id: GET_VAR_NAMES.id,
            },
        ).addProp({
            varName: GET_VAR_NAMES.legalEntityId,
            callVarName: GET_VAR_NAMES.legalEntityId,
            type: 'number',
            decorator: new GmQueryParamNumDec('legal_entity_id'),
        })
        if (GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'get')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.get(methodGetById)
        }
        const methodPagination = new GmModuleControllerMethodGetPagination(
            this.getConfig(),
            this.serviceCrud.api,
            {
                params: GET_ALL_VAR_NAMES.params,
                userDto: GET_ALL_VAR_NAMES.userDto,
                paramsSchema: this.getValidatorParamsDtoVarName(),
            },
        ).addProp({
            varName: GET_ALL_VAR_NAMES.legalEntityId,
            callVarName: GET_ALL_VAR_NAMES.legalEntityId,
            type: 'number',
            decorator: new GmQueryParamNumDec('legal_entity_id'),
        })
        if (GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'list')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.list(methodPagination)
        }
        this.addMethod(methodCreate)
        this.addMethod(methodUpdate)
        this.addMethod(methodDelete)
        this.addMethod(methodGetById)
        this.addMethod(methodPagination)
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: null,
        })
        
        this.addElementBeforeClass(`
            const ${this.getValidatorCreateBodyVarName()} = ${this.validator.api.getCreateDtoSchema()}
             
            const ${this.getValidatorUpdateBodyVarName()} = ${this.validator.api.getUpdateDtoSchema()}
             
            const ${this.getValidatorParamsDtoVarName()} = ${this.validator.api.getDtoPaginationQueryParamsSchema()}
        `)
    }
    
    private getValidatorCreateBodyVarName(): string {
        return `create${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Schema`
    }
    
    private getValidatorUpdateBodyVarName(): string {
        return `update${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Schema`
    }
    
    
    private getValidatorParamsDtoVarName(): string {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.singular)}DtoPaginationQueryParamsSchema`
    }
    
    private getServiceVarName(): string {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.singular)}Service`
    }
}


export class GmModuleControllerClassCreateBySqlDynamicLeId extends GmModuleAbstractControllerClass implements IGmModuleClass {
    
    
    private readonly validator: GmModuleValidator
    private readonly serviceCrud: GmModuleServiceClassCreateBySqlDynamicLeId
    private readonly gmModuleCreateDto: GmModuleCreateDto
    private readonly gmAccessStructureMethodProcessorByDynamicLeId: GmAccessStructureMethodProcessor
    
    constructor(config: GmCrudConfig,
    ) {
        super(
            config,
            `Create${StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`,
        )
        const hasLeIdColumn = 'legal_entity_id' in this.getConfig().repository.columns
        this.validator = new GmModuleValidator(
            config
        )
        this.serviceCrud = new GmModuleServiceClassCreateBySqlDynamicLeId(
            config,
            `this.${this.getServiceVarName()}`,
            {
                initiatorOpenUserId: `${CREATE_VAR_NAMES.userDto}.open_user_id`,
                createDto: CREATE_VAR_NAMES.body,
                legalEntityId: hasLeIdColumn ? `${CREATE_VAR_NAMES.body}.legal_entity_id` : CREATE_VAR_NAMES.legalEntityId,
            },
        )
        this.gmModuleCreateDto = new GmModuleCreateDto(config)
        this.gmAccessStructureMethodProcessorByDynamicLeId = new GmAccessStructureMethodProcessorByDynamicLeId(config)
        
    }
    
    public init(): void {
        super.init()
        this.addModule(this.validator)
        this.addModule(this.serviceCrud)
        this.addModule(this.gmModuleCreateDto)
        
        const hasLeIdColumn = 'legal_entity_id' in this.getConfig().repository.columns
        const methodCreate = new GmModuleControllerMethodCreate(
            this.getConfig(),
            this.serviceCrud.api,
            {
                createDto: CREATE_VAR_NAMES.body,
                userDto: CREATE_VAR_NAMES.userDto,
                createDtoSchema: this.getValidatorCreateBodyVarName(),
            },
        )
        if (!hasLeIdColumn) {
            methodCreate.addProp({
                type: 'number',
                varName: CREATE_VAR_NAMES.legalEntityId,
                callVarName: CREATE_VAR_NAMES.legalEntityId,
                decorator: new GmBodyParamNumDec('legal_entity_id'),
            })
        }
        if (GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'add')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.add(methodCreate)
        }
        
        this.addMethod(methodCreate)
        
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: null,
        })
        
        this.addElementBeforeClass(`
            const ${this.getValidatorCreateBodyVarName()} = ${this.validator.api.getCreateDtoSchema()}
        `)
    }
    
    private getValidatorCreateBodyVarName(): string {
        return `create${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Schema`
    }
    
    private getServiceVarName(): string {
        return `create${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`
    }
}


export class GmModuleControllerClassUpdateBySqlDynamicLeId extends GmModuleAbstractControllerClass implements IGmModuleClass {
    
    
    private readonly validator: GmModuleValidator
    private readonly serviceCrud: GmModuleServiceClassUpdateBySqlDynamicLeId
    private readonly gmModuleUpdateDto: GmModuleUpdateDto
    private readonly gmAccessStructureMethodProcessorByDynamicLeId: GmAccessStructureMethodProcessor
    
    constructor(config: GmCrudConfig,
    ) {
        super(
            config,
            `Update${StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`,
        )
        const hasLeIdColumn = 'legal_entity_id' in this.getConfig().repository.columns
        this.validator = new GmModuleValidator(
            config
        )
        this.serviceCrud = new GmModuleServiceClassUpdateBySqlDynamicLeId(
            config,
            `this.${this.getServiceVarName()}`,
            {
                initiatorOpenUserId: `${UPDATE_VAR_NAMES.userDto}.open_user_id`,
                updateDto: UPDATE_VAR_NAMES.body,
                legalEntityId: hasLeIdColumn ? `${UPDATE_VAR_NAMES.body}.legal_entity_id` : UPDATE_VAR_NAMES.legalEntityId,
                id: UPDATE_VAR_NAMES.id,
            },
        )
        this.gmModuleUpdateDto = new GmModuleUpdateDto(config)
        this.gmAccessStructureMethodProcessorByDynamicLeId = new GmAccessStructureMethodProcessorByDynamicLeId(config)
        
    }
    
    public init(): void {
        super.init()
        this.addModule(this.validator)
        this.addModule(this.serviceCrud)
        this.addModule(this.gmModuleUpdateDto)
        
        const hasLeIdColumn = 'legal_entity_id' in this.getConfig().repository.columns
        
        const methodUpdate = new GmModuleControllerMethodUpdate(
            this.getConfig(),
            this.serviceCrud.api,
            {
                updateDto: UPDATE_VAR_NAMES.body,
                userDto: UPDATE_VAR_NAMES.userDto,
                updateDtoSchema: this.getValidatorUpdateBodyVarName(),
                id: UPDATE_VAR_NAMES.id,
            },
        )
        
        if (!hasLeIdColumn) {
            methodUpdate.addProp({
                type: 'number',
                varName: UPDATE_VAR_NAMES.legalEntityId,
                callVarName: UPDATE_VAR_NAMES.legalEntityId,
                decorator: new GmBodyParamNumDec('legal_entity_id'),
            })
        }
        
        if (GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'update')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.update(methodUpdate)
        }
        this.addMethod(methodUpdate)
        
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: null,
        })
        
        this.addElementBeforeClass(`
            const ${this.getValidatorUpdateBodyVarName()} = ${this.validator.api.getUpdateDtoSchema()}
        `)
    }
    
    private getValidatorUpdateBodyVarName(): string {
        return `update${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Schema`
    }
    
    private getServiceVarName(): string {
        return `update${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`
    }
}

export class GmModuleControllerClassDeleteBySqlDynamicLeId extends GmModuleAbstractControllerClass implements IGmModuleClass {
    
    private readonly serviceCrud: GmModuleServiceClassDeleteBySqlDynamicLeId
    private readonly gmAccessStructureMethodProcessorByDynamicLeId: GmAccessStructureMethodProcessor
    
    constructor(config: GmCrudConfig,
    ) {
        super(
            config,
            `Delete${StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`,
        )
        this.serviceCrud = new GmModuleServiceClassDeleteBySqlDynamicLeId(
            config,
            `this.${this.getServiceVarName()}`,
            {
                initiatorOpenUserId: `${DELETE_VAR_NAMES.userDto}.open_user_id`,
                legalEntityId: DELETE_VAR_NAMES.legalEntityId,
                id: DELETE_VAR_NAMES.id,
            },
        )
        this.gmAccessStructureMethodProcessorByDynamicLeId = new GmAccessStructureMethodProcessorByDynamicLeId(config)
        
    }
    
    public init(): void {
        super.init()
        this.addModule(this.serviceCrud)
        
        const methodDelete = new GmModuleControllerMethodDelete(
            this.getConfig(),
            this.serviceCrud.api,
            {
                userDto: DELETE_VAR_NAMES.userDto,
                id: DELETE_VAR_NAMES.id,
            },
        ).addProp({
            varName: DELETE_VAR_NAMES.legalEntityId,
            callVarName: DELETE_VAR_NAMES.legalEntityId,
            type: 'number',
            decorator: new GmQueryParamNumDec('legal_entity_id'),
        })
        if (GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'delete')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.delete(methodDelete)
        }
        
        this.addMethod(methodDelete)
        
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: null,
        })
    }
    
    
    private getServiceVarName(): string {
        return `delete${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`
    }
}


export class GmModuleControllerClassGetBySqlDynamicLeId extends GmModuleAbstractControllerClass implements IGmModuleClass {
    
    private readonly serviceCrud: GmModuleServiceClassGetBySqlDynamicLeId
    private readonly gmAccessStructureMethodProcessorByDynamicLeId: GmAccessStructureMethodProcessor
    
    constructor(config: GmCrudConfig,
    ) {
        super(
            config,
            `Get${StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`,
        )
        this.serviceCrud = new GmModuleServiceClassGetBySqlDynamicLeId(
            config,
            `this.${this.getServiceVarName()}`,
            {
                legalEntityId: GET_VAR_NAMES.legalEntityId,
                id: GET_VAR_NAMES.id,
            },
        )
        this.gmAccessStructureMethodProcessorByDynamicLeId = new GmAccessStructureMethodProcessorByDynamicLeId(config)
        
    }
    
    public init(): void {
        super.init()
        this.addModule(this.serviceCrud)
        
        const methodGetById = new GmModuleControllerMethodGetById(
            this.getConfig(),
            this.serviceCrud.api,
            {
                userDto: GET_VAR_NAMES.userDto,
                id: GET_VAR_NAMES.id,
            },
        ).addProp({
            varName: GET_VAR_NAMES.legalEntityId,
            callVarName: GET_VAR_NAMES.legalEntityId,
            type: 'number',
            decorator: new GmQueryParamNumDec('legal_entity_id'),
        })
        
        if (GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'get')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.get(methodGetById)
        }
        
        this.addMethod(methodGetById)
        
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: null,
        })
    }
    
    
    private getServiceVarName(): string {
        return `get${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`
    }
}


export class GmModuleControllerClassGetAllBySqlDynamicLeId extends GmModuleAbstractControllerClass implements IGmModuleClass {
    
    
    private readonly validator: GmModuleValidator
    private readonly serviceCrud: GmModuleServiceClassGetAllBySqlDynamicLeId
    private readonly gmAccessStructureMethodProcessorByDynamicLeId: GmAccessStructureMethodProcessorByDynamicLeId
    
    constructor(config: GmCrudConfig,
    ) {
        super(
            config,
            `GetAll${StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`,
        )
        this.validator = new GmModuleValidator(
            config
        )
        this.serviceCrud = new GmModuleServiceClassGetAllBySqlDynamicLeId(
            config,
            `this.${this.getServiceVarName()}`,
            {
                params: GET_ALL_VAR_NAMES.params,
                legalEntityId: GET_ALL_VAR_NAMES.legalEntityId,
            },
        )
        this.gmAccessStructureMethodProcessorByDynamicLeId = new GmAccessStructureMethodProcessorByDynamicLeId(config)
        
    }
    
    public init(): void {
        super.init()
        this.addModule(this.validator)
        this.addModule(this.serviceCrud)
        
        const methodPagination = new GmModuleControllerMethodGetPagination(
            this.getConfig(),
            this.serviceCrud.api,
            {
                params: GET_ALL_VAR_NAMES.params,
                userDto: GET_ALL_VAR_NAMES.userDto,
                paramsSchema: this.getValidatorParamsDtoVarName(),
            },
        ).addProp({
            varName: GET_ALL_VAR_NAMES.legalEntityId,
            callVarName: GET_ALL_VAR_NAMES.legalEntityId,
            type: 'number',
            decorator: new GmQueryParamNumDec('legal_entity_id'),
        })
        if (GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'list')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.list(methodPagination)
        }
        this.addMethod(methodPagination)
        
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: null,
        })
        
        this.addElementBeforeClass(`
            const ${this.getValidatorParamsDtoVarName()} = ${this.validator.api.getDtoPaginationQueryParamsSchema()}
        `)
    }
    
    
    private getValidatorParamsDtoVarName(): string {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.singular)}DtoPaginationQueryParamsSchema`
    }
    
    private getServiceVarName(): string {
        return `getAll${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`
    }
}
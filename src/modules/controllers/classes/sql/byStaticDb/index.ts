import {GmCrudConfig} from 'os-core-ts'
import {StringCaseHelper} from '@helpers/StringCaseHelper'
import {GmCrudConfigChecker} from '@crudConfig/GmCrudConfigChecker'
import {GmAccessStructureMethodProcessor} from '@modules/structure/GmAccessStructureMethodProcessor'
import {IGmModuleClass, IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmModuleValidator} from '@modules/validator/GmModuleValidator'
import {GmModuleAbstractControllerClass} from '@modules/controllers/classes/abstract/GmModuleAbstractControllerClass'
import {
    GmModuleServiceClassCreateBySqlStaticDb,
    GmModuleServiceClassCrudBySqlStaticDb,
    GmModuleServiceClassDeleteBySqlStaticDb,
    GmModuleServiceClassGetAllBySqlStaticDb,
    GmModuleServiceClassGetBySqlStaticDb,
    GmModuleServiceClassUpdateBySqlStaticDb,
} from '@modules/services/classes/sql/byStaticDb'
import {GmModuleUpdateDto} from '@modules/dto/GmModuleUpdateDto'
import {GmModuleControllerMethodCreate} from '@modules/controllers/methods/GmModuleControllerMethodCreate'
import {GmModuleControllerMethodUpdate} from '@modules/controllers/methods/GmModuleControllerMethodUpdate'
import {GmModuleControllerMethodDelete} from '@modules/controllers/methods/GmModuleControllerMethodDelete'
import {GmModuleControllerMethodGetById} from '@modules/controllers/methods/GmModuleControllerMethodGetById'
import {GmModuleControllerMethodGetPagination} from '@modules/controllers/methods/GmModuleControllerMethodGetPagination'
import {GmBodyParamNumDec} from '@decorators/controllerDecorators/GmBodyParamDec'
import {GmQueryParamNumDec} from '@decorators/controllerDecorators/GmQueryParamDec'


class GmGetVarNamesByStaticDb {
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
            createBodySchema: `create${StringCaseHelper.toPascalCase(this.config.dtoName.singular)}Schema`,
            legalEntityId: 'legalEntityId',
        }
    }
    
    public update() {
        const updateBody = 'body'
        return {
            updateBody,
            updateBodySchema: `update${StringCaseHelper.toPascalCase(this.config.dtoName.singular)}Schema`,
            id: 'id',
            openUserId: `${this.userDto()}.open_user_id`,
            legalEntityId: 'legalEntityId',
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
            paramsSchema: `${StringCaseHelper.toCamelCase(this.config.dtoName.singular)}DtoPaginationQueryParamsSchema`,
            openUserId: `${this.userDto()}.open_user_id`,
            legalEntityId: 'legalEntityId',
        }
    }
}

class GmAccessStructureMethodProcessorByStaticDb extends GmAccessStructureMethodProcessor {
    
    constructor(config: GmCrudConfig) {
        const gmGetVarNames = new GmGetVarNamesByStaticDb(config)
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
    
    public add(method: IGmModuleClassMethod) {
        super.add(method)
        method.appendPropDecorator({
            decorator: new GmBodyParamNumDec('legal_entity_id'),
            type: 'number',
            varName: 'legalEntityId',
        })
    }
    
    public update(method: IGmModuleClassMethod) {
        super.update(method)
        
        method.appendPropDecorator({
            decorator: new GmBodyParamNumDec('legal_entity_id'),
            type: 'number',
            varName: 'legalEntityId',
        })
    }
    
    public delete(method: IGmModuleClassMethod) {
        super.delete(method)
        
        method.appendPropDecorator({
            decorator: new GmQueryParamNumDec('legal_entity_id'),
            type: 'number',
            varName: 'legalEntityId',
        })
    }
    
    public get(method: IGmModuleClassMethod) {
        super.get(method)
        method.appendPropDecorator({
            decorator: new GmQueryParamNumDec('legal_entity_id'),
            type: 'number',
            varName: 'legalEntityId',
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


class GmValidatorBuilderByStaticDb {
    
    private readonly gmGetVarNames: GmGetVarNamesByStaticDb
    
    constructor(
        private readonly config: GmCrudConfig,
        private readonly validatorVarName: string,
        private readonly validator: GmModuleValidator,
    ) {
        this.gmGetVarNames = new GmGetVarNamesByStaticDb(config)
    }
    
    
    public initValidator(): string {
        return `const ${this.validatorVarName} = new ${this.validator.getPropertyName()}()`
    }
    
    public add() {
        return `const ${this.gmGetVarNames.add().createBodySchema} = ${this.validator.api.getCreateDtoSchema()}`
    }
    
    public update() {
        return `const ${this.gmGetVarNames.update().updateBodySchema} = ${this.validator.api.getUpdateDtoSchema()}`
        
    }
    
    public list() {
        return `const ${this.gmGetVarNames.list().paramsSchema} = ${this.validator.api.getDtoPaginationQueryParamsSchema()}`
    }
    
}

export class GmModuleControllerClassCrudBySqlStaticDb extends GmModuleAbstractControllerClass implements IGmModuleClass {
    
    
    private readonly validator: GmModuleValidator
    private readonly serviceCrud: GmModuleServiceClassCrudBySqlStaticDb
    private readonly gmGetVarNames: GmGetVarNamesByStaticDb
    private readonly gmAccessStructureMethodProcessorByStaticDb: GmAccessStructureMethodProcessorByStaticDb
    private readonly gmValidatorBuilder: GmValidatorBuilderByStaticDb
    
    constructor(config: GmCrudConfig,
    ) {
        super(
            config,
            `${StringCaseHelper.toPascalCase(config.dtoName.plural)}Controller`,
        )
        this.validator = new GmModuleValidator(
            config,
            this.getValidatorVarName(),
        )
        this.gmValidatorBuilder = new GmValidatorBuilderByStaticDb(
            config,
            this.getValidatorVarName(),
            this.validator,
        )
        
        const gmGetVarNames = new GmGetVarNamesByStaticDb(config)
        
        this.serviceCrud = new GmModuleServiceClassCrudBySqlStaticDb(
            config,
            `this.${this.getServiceVarName()}`,
            {
                create: {
                    createDto: gmGetVarNames.add().createBody,
                    initiatorOpenUserId: gmGetVarNames.add().openUserId,
                },
                update: {
                    id: gmGetVarNames.update().id,
                    updateDto: gmGetVarNames.update().updateBody,
                    initiatorOpenUserId: gmGetVarNames.update().openUserId,
                },
                delete: {
                    id: gmGetVarNames.delete().id,
                    initiatorOpenUserId: gmGetVarNames.delete().openUserId,
                },
                getById: {
                    id: gmGetVarNames.get().id,
                },
                getPagination: {
                    params: gmGetVarNames.list().params,
                },
            },
        )
        this.gmAccessStructureMethodProcessorByStaticDb = new GmAccessStructureMethodProcessorByStaticDb(config)
        this.gmGetVarNames = gmGetVarNames
        
    }
    
    public init(): void {
        super.init()
        this.addModule(this.validator)
        this.addModule(this.serviceCrud)
        
        
        const methodCreate = new GmModuleControllerMethodCreate(
            this.getConfig(),
            this.serviceCrud.api,
            {
                createDto: this.gmGetVarNames.add().createBody,
                userDto: this.gmGetVarNames.userDto(),
                createDtoSchema: this.gmGetVarNames.add().createBodySchema,
            },
        )
        if (GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'add')) {
            this.gmAccessStructureMethodProcessorByStaticDb.add(methodCreate)
        }
        const methodUpdate = new GmModuleControllerMethodUpdate(
            this.getConfig(),
            this.serviceCrud.api,
            {
                updateDto: this.gmGetVarNames.update().updateBody,
                userDto: this.gmGetVarNames.userDto(),
                updateDtoSchema: this.gmGetVarNames.update().updateBodySchema,
                id: this.gmGetVarNames.update().id,
            },
        )
        if (GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'update')) {
            this.gmAccessStructureMethodProcessorByStaticDb.update(methodUpdate)
        }
        const methodDelete = new GmModuleControllerMethodDelete(
            this.getConfig(),
            this.serviceCrud.api,
            {
                userDto: this.gmGetVarNames.userDto(),
                id: this.gmGetVarNames.delete().id,
            },
        )
        if (GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'delete')) {
            this.gmAccessStructureMethodProcessorByStaticDb.delete(methodDelete)
        }
        const methodGetById = new GmModuleControllerMethodGetById(
            this.getConfig(),
            this.serviceCrud.api,
            {
                userDto: this.gmGetVarNames.userDto(),
                id: this.gmGetVarNames.get().id,
            },
        )
        if (GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'get')) {
            this.gmAccessStructureMethodProcessorByStaticDb.get(methodGetById)
        }
        const methodPagination = new GmModuleControllerMethodGetPagination(
            this.getConfig(),
            this.serviceCrud.api,
            {
                params: this.gmGetVarNames.list().params,
                userDto: this.gmGetVarNames.userDto(),
                paramsSchema: this.gmGetVarNames.list().paramsSchema,
            },
        )
        if (GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'list')) {
            this.gmAccessStructureMethodProcessorByStaticDb.list(methodPagination)
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
            ${this.gmValidatorBuilder.initValidator()}
            
            ${this.gmValidatorBuilder.add()}
            
            ${this.gmValidatorBuilder.update()}
            
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


export class GmModuleControllerClassCreateBySqlStaticDb extends GmModuleAbstractControllerClass implements IGmModuleClass {
    
    
    private readonly validator: GmModuleValidator
    private readonly serviceCrud: GmModuleServiceClassCreateBySqlStaticDb
    private readonly gmGetVarNames: GmGetVarNamesByStaticDb
    private readonly gmAccessStructureMethodProcessorByStaticDb: GmAccessStructureMethodProcessorByStaticDb
    private readonly gmValidatorBuilder: GmValidatorBuilderByStaticDb
    
    constructor(config: GmCrudConfig,
    ) {
        super(
            config,
            `Create${StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`,
        )
        this.validator = new GmModuleValidator(
            config,
            this.getValidatorVarName(),
        )
        this.gmValidatorBuilder = new GmValidatorBuilderByStaticDb(
            config,
            this.getValidatorVarName(),
            this.validator,
        )
        const gmGetVarNames = new GmGetVarNamesByStaticDb(config)
        
        this.serviceCrud = new GmModuleServiceClassCreateBySqlStaticDb(
            config,
            `this.${this.getServiceVarName()}`,
            {
                createDto: gmGetVarNames.add().createBody,
                initiatorOpenUserId: gmGetVarNames.add().openUserId,
            },
        )
        this.gmAccessStructureMethodProcessorByStaticDb = new GmAccessStructureMethodProcessorByStaticDb(config)
        this.gmGetVarNames = gmGetVarNames
        
    }
    
    public init(): void {
        super.init()
        this.addModule(this.validator)
        this.addModule(this.serviceCrud)
        
        
        const methodCreate = new GmModuleControllerMethodCreate(
            this.getConfig(),
            this.serviceCrud.api,
            {
                createDto: this.gmGetVarNames.add().createBody,
                userDto: this.gmGetVarNames.userDto(),
                createDtoSchema: this.gmGetVarNames.add().createBodySchema,
            },
        )
        if (GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'add')) {
            this.gmAccessStructureMethodProcessorByStaticDb.add(methodCreate)
        }
        this.addMethod(methodCreate)
        
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: null,
        })
        
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


export class GmModuleControllerClassUpdateBySqlStaticDb extends GmModuleAbstractControllerClass implements IGmModuleClass {
    
    
    private readonly validator: GmModuleValidator
    private readonly serviceCrud: GmModuleServiceClassUpdateBySqlStaticDb
    private readonly gmGetVarNames: GmGetVarNamesByStaticDb
    private readonly gmAccessStructureMethodProcessorByStaticDb: GmAccessStructureMethodProcessorByStaticDb
    private readonly gmValidatorBuilder: GmValidatorBuilderByStaticDb
    private readonly gmModuleUpdateDto: GmModuleUpdateDto
    
    constructor(config: GmCrudConfig,
    ) {
        super(
            config,
            `Update${StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`,
        )
        this.validator = new GmModuleValidator(
            config,
            this.getValidatorVarName(),
        )
        this.gmValidatorBuilder = new GmValidatorBuilderByStaticDb(
            config,
            this.getValidatorVarName(),
            this.validator,
        )
        const gmGetVarNames = new GmGetVarNamesByStaticDb(config)
        
        this.serviceCrud = new GmModuleServiceClassUpdateBySqlStaticDb(
            config,
            `this.${this.getServiceVarName()}`,
            {
                id: gmGetVarNames.update().id,
                updateDto: gmGetVarNames.update().updateBody,
                initiatorOpenUserId: gmGetVarNames.update().openUserId,
            },
        )
        this.gmAccessStructureMethodProcessorByStaticDb = new GmAccessStructureMethodProcessorByStaticDb(config)
        this.gmGetVarNames = gmGetVarNames
        this.gmModuleUpdateDto = new GmModuleUpdateDto(config)
        
    }
    
    public init(): void {
        super.init()
        this.addModule(this.validator)
        this.addModule(this.serviceCrud)
        
        const methodUpdate = new GmModuleControllerMethodUpdate(
            this.getConfig(),
            this.serviceCrud.api,
            {
                updateDto: this.gmGetVarNames.update().updateBody,
                userDto: this.gmGetVarNames.userDto(),
                updateDtoSchema: this.gmGetVarNames.update().updateBodySchema,
                id: this.gmGetVarNames.update().id,
            },
        )
        if (GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'update')) {
            this.gmAccessStructureMethodProcessorByStaticDb.update(methodUpdate)
            this.addModule(this.gmModuleUpdateDto)
        }
        this.addMethod(methodUpdate)
        
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: null,
        })
        
        
        this.addElementBeforeClass(`
            ${this.gmValidatorBuilder.initValidator()}
          
            ${this.gmValidatorBuilder.update()}
        `)
    }
    
    private getValidatorVarName() {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`
    }
    
    private getServiceVarName(): string {
        return `update${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`
    }
}

export class GmModuleControllerClassDeleteBySqlStaticDb extends GmModuleAbstractControllerClass implements IGmModuleClass {
    
    private readonly serviceCrud: GmModuleServiceClassDeleteBySqlStaticDb
    private readonly gmGetVarNames: GmGetVarNamesByStaticDb
    private readonly gmAccessStructureMethodProcessorByStaticDb: GmAccessStructureMethodProcessorByStaticDb
    
    constructor(config: GmCrudConfig,
    ) {
        super(
            config,
            `Delete${StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`,
        )
        const gmGetVarNames = new GmGetVarNamesByStaticDb(config)
        this.serviceCrud = new GmModuleServiceClassDeleteBySqlStaticDb(
            config,
            `this.${this.getServiceVarName()}`,
            {
                id: gmGetVarNames.delete().id,
                initiatorOpenUserId: gmGetVarNames.delete().openUserId,
            },
        )
        this.gmAccessStructureMethodProcessorByStaticDb = new GmAccessStructureMethodProcessorByStaticDb(config)
        this.gmGetVarNames = gmGetVarNames
    }
    
    public init(): void {
        super.init()
        this.addModule(this.serviceCrud)
        
        const methodDelete = new GmModuleControllerMethodDelete(
            this.getConfig(),
            this.serviceCrud.api,
            {
                userDto: this.gmGetVarNames.userDto(),
                id: this.gmGetVarNames.delete().id,
            },
        )
        if (GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'delete')) {
            this.gmAccessStructureMethodProcessorByStaticDb.delete(methodDelete)
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


export class GmModuleControllerClassGetBySqlStaticDb extends GmModuleAbstractControllerClass implements IGmModuleClass {
    
    private readonly serviceCrud: GmModuleServiceClassGetBySqlStaticDb
    private readonly gmGetVarNames: GmGetVarNamesByStaticDb
    private readonly gmAccessStructureMethodProcessorByStaticDb: GmAccessStructureMethodProcessorByStaticDb
    
    
    constructor(config: GmCrudConfig,
    ) {
        super(
            config,
            `Get${StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`,
        )
        const gmGetVarNames = new GmGetVarNamesByStaticDb(config)
        this.serviceCrud = new GmModuleServiceClassGetBySqlStaticDb(
            config,
            `this.${this.getServiceVarName()}`,
            {
                id: gmGetVarNames.get().id,
            },
        )
        this.gmAccessStructureMethodProcessorByStaticDb = new GmAccessStructureMethodProcessorByStaticDb(config)
        this.gmGetVarNames = gmGetVarNames
    }
    
    public init(): void {
        super.init()
        this.addModule(this.serviceCrud)
        
        const methodGetById = new GmModuleControllerMethodGetById(
            this.getConfig(),
            this.serviceCrud.api,
            {
                userDto: this.gmGetVarNames.userDto(),
                id: this.gmGetVarNames.get().id,
            },
        )
        if (GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'get')) {
            this.gmAccessStructureMethodProcessorByStaticDb.get(methodGetById)
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


export class GmModuleControllerClassGetAllBySqlStaticDb extends GmModuleAbstractControllerClass implements IGmModuleClass {
    
    
    private readonly validator: GmModuleValidator
    private readonly serviceCrud: GmModuleServiceClassGetAllBySqlStaticDb
    private readonly gmGetVarNames: GmGetVarNamesByStaticDb
    private readonly gmAccessStructureMethodProcessorByStaticDb: GmAccessStructureMethodProcessorByStaticDb
    private readonly gmValidatorBuilder: GmValidatorBuilderByStaticDb
    
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
        
        this.gmValidatorBuilder = new GmValidatorBuilderByStaticDb(
            config,
            this.getValidatorVarName(),
            this.validator,
        )
        
        const gmGetVarNames = new GmGetVarNamesByStaticDb(config)
        
        this.serviceCrud = new GmModuleServiceClassGetAllBySqlStaticDb(
            config,
            `this.${this.getServiceVarName()}`,
            {
                params: gmGetVarNames.list().params,
            },
        )
        this.gmAccessStructureMethodProcessorByStaticDb = new GmAccessStructureMethodProcessorByStaticDb(config)
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
        )
        if (GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'list')) {
            this.gmAccessStructureMethodProcessorByStaticDb.list(methodPagination)
        }
        this.addMethod(methodPagination)
        
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: null,
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
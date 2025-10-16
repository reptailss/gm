import {
    GmModuleServiceClassAll,
    GmModuleServiceClassCreate,
    GmModuleServiceClassDelete,
    GmModuleServiceClassGet,
    GmModuleServiceClassGetAll,
    GmModuleServiceClassUpdate,
} from '@modules/services/interfaces/gmModuleServiceClassCurd'
import {
    IGmModuleServiceApiAll,
    IGmModuleServiceApiCreate,
    IGmModuleServiceApiDelete,
    IGmModuleServiceApiGet,
    IGmModuleServiceApiGetPagination,
    IGmModuleServiceApiUpdate,
} from '@modules/services/interfaces/gmModuleServiceClassCurdApi'
import {GmServiceActionsLoggerService} from '@services/sendActionSystemLog/GmServiceActionsLoggerService'
import {GmCrudConfig} from 'os-core-ts'
import {StringCaseHelper} from '@helpers/StringCaseHelper'
import {GmModuleServiceMethodCreate} from '@modules/services/methods/GmModuleServiceMethodCreate'
import {GmModuleServiceMethodUpdate} from '@modules/services/methods/GmModuleServiceMethodUpdate'
import {GmModuleServiceMethodDelete} from '@modules/services/methods/GmModuleServiceMethodDelete'
import {GmModuleServiceMethodGetById} from '@modules/services/methods/GmModuleServiceMethodGetById'
import {GmModuleServiceMethodGetPagination} from '@modules/services/methods/GmModuleServiceMethodGetPagination'
import {
    GmModuleServiceClassApiAll,
    GmModuleServiceClassApiCreate,
    GmModuleServiceClassApiDelete,
    GmModuleServiceClassApiGet,
    GmModuleServiceClassApiGetPagination,
    GmModuleServiceClassApiUpdate,
} from '@modules/services/classes/api/GmModuleServiceClassCurdApi'
import {GmModuleServiceClassByNoSqlStaticDb} from '@modules/services/classes/bases/GmModuleServiceClassByNoSqlStaticDb'


type AllCallVarNames = {
    create: CreateCallVarNames
    update: UpdateCallVarNames
    delete: DeleteCallVarNames
    getById: GetByIdCallVarNames
    getPagination: GetPaginationCallVarNames
}

type CreateCallVarNames = {
    initiatorOpenUserId: string
    createDto: string
}

type UpdateCallVarNames = {
    initiatorOpenUserId: string
    updateDto: string
    id: string
}

type DeleteCallVarNames = {
    initiatorOpenUserId: string
    id: string
}

type GetByIdCallVarNames = {
    id: string
}

type GetPaginationCallVarNames = {
    params: string
}

export class GmModuleServiceClassCrudByNoSqlStaticDb extends GmModuleServiceClassByNoSqlStaticDb implements GmModuleServiceClassAll {
    
    public api!: IGmModuleServiceApiAll
    private readonly actionsLoggerService: GmServiceActionsLoggerService
    
    constructor(
        config: GmCrudConfig,
        private readonly serviceVarName: string,
        private readonly allCallVarNames: AllCallVarNames,
    ) {
        super(
            config,
            `${StringCaseHelper.toPascalCase(config.dtoName.plural)}Service`,
        )
        this.actionsLoggerService = new GmServiceActionsLoggerService()
        
    }
    
    public init() {
        super.init()
        this.addService(this.actionsLoggerService)
            .addMethod(
                new GmModuleServiceMethodCreate(
                    this.getConfig(),
                    this.getModuleRepository(),
                    this.actionsLoggerService,
                    this.allCallVarNames.create,
                ),
            )
            .addMethod(
                new GmModuleServiceMethodUpdate(
                    this.getConfig(),
                    this.getModuleRepository(),
                    this.actionsLoggerService,
                    this.allCallVarNames.update,
                ),
            )
            .addMethod(
                new GmModuleServiceMethodDelete(
                    this.getConfig(),
                    this.getModuleRepository(),
                    this.actionsLoggerService,
                    this.allCallVarNames.delete,
                ),
            )
            .addMethod(
                new GmModuleServiceMethodGetById(
                    this.getConfig(),
                    this.getModuleRepository(),
                    this.allCallVarNames.getById,
                ),
            )
            .addMethod(
                new GmModuleServiceMethodGetPagination(
                    this.getConfig(),
                    this.getModuleRepository(),
                    this.allCallVarNames.getPagination,
                ),
            )
        
        this.api = new GmModuleServiceClassApiAll(
            this.serviceVarName,
            this.getMethodByIndex(0),
            this.getMethodByIndex(1),
            this.getMethodByIndex(2),
            this.getMethodByIndex(3),
            this.getMethodByIndex(4),
        )
    }
}

export class GmModuleServiceClassCreateByNoSqlStaticDb extends GmModuleServiceClassByNoSqlStaticDb implements GmModuleServiceClassCreate {
    
    public api!: IGmModuleServiceApiCreate
    private readonly actionsLoggerService: GmServiceActionsLoggerService
    
    constructor(
        config: GmCrudConfig,
        private serviceVarName: string,
        private readonly callVarNames: CreateCallVarNames,
    ) {
        super(
            config,
            `Create${StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`,
        )
        this.actionsLoggerService = new GmServiceActionsLoggerService()
    }
    
    public init() {
        super.init()
        this.addService(this.actionsLoggerService)
            .addMethod(
                new GmModuleServiceMethodCreate(
                    this.getConfig(),
                    this.getModuleRepository(),
                    this.actionsLoggerService,
                    this.callVarNames,
                ),
            )
        this.api = new GmModuleServiceClassApiCreate(
            this.serviceVarName,
            this.getMethodByIndex(0),
        )
    }
}

export class GmModuleServiceClassUpdateByNoSqlStaticDb extends GmModuleServiceClassByNoSqlStaticDb implements GmModuleServiceClassUpdate {
    
    public api!: IGmModuleServiceApiUpdate
    private readonly actionsLoggerService: GmServiceActionsLoggerService
    
    constructor(
        config: GmCrudConfig,
        private readonly serviceVarName: string,
        private readonly callVarNames: UpdateCallVarNames,
    ) {
        super(
            config,
            `Update${StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`,
        )
        this.actionsLoggerService = new GmServiceActionsLoggerService()
    }
    
    public init() {
        super.init()
        this.addService(this.actionsLoggerService)
            .addMethod(
                new GmModuleServiceMethodUpdate(
                    this.getConfig(),
                    this.getModuleRepository(),
                    this.actionsLoggerService,
                    this.callVarNames,
                ),
            )
        this.api = new GmModuleServiceClassApiUpdate(
            this.serviceVarName,
            this.getMethodByIndex(0),
        )
    }
}

export class GmModuleServiceClassDeleteByNoSqlStaticDb extends GmModuleServiceClassByNoSqlStaticDb implements GmModuleServiceClassDelete {
    
    public api!: IGmModuleServiceApiDelete
    private readonly actionsLoggerService: GmServiceActionsLoggerService
    
    constructor(
        config: GmCrudConfig,
        private readonly serviceVarName: string,
        private readonly callVarNames: DeleteCallVarNames,
    ) {
        super(
            config,
            `Delete${StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`,
        )
        this.actionsLoggerService = new GmServiceActionsLoggerService()
    }
    
    public init() {
        super.init()
        this.addService(this.actionsLoggerService)
            .addMethod(
                new GmModuleServiceMethodDelete(
                    this.getConfig(),
                    this.getModuleRepository(),
                    this.actionsLoggerService,
                    this.callVarNames,
                ),
            )
        this.api = new GmModuleServiceClassApiDelete(
            this.serviceVarName,
            this.getMethodByIndex(0),
        )
    }
}

export class GmModuleServiceClassGetByNoSqlStaticDb extends GmModuleServiceClassByNoSqlStaticDb implements GmModuleServiceClassGet {
    
    public api!: IGmModuleServiceApiGet
    
    constructor(
        config: GmCrudConfig,
        private readonly serviceVarName: string,
        private readonly callVarNames: GetByIdCallVarNames,
    ) {
        super(
            config,
            `Get${StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`,
        )
        
    }
    
    public init() {
        super.init()
        this.addMethod(
            new GmModuleServiceMethodGetById(
                this.getConfig(),
                this.getModuleRepository(),
                this.callVarNames,
            ),
        )
        this.api = new GmModuleServiceClassApiGet(
            this.serviceVarName,
            this.getMethodByIndex(0),
        )
    }
}

export class GmModuleServiceClassGetAllByNoSqlStaticDb extends GmModuleServiceClassByNoSqlStaticDb implements GmModuleServiceClassGetAll {
    
    public api!: IGmModuleServiceApiGetPagination
    
    constructor(
        config: GmCrudConfig,
        private readonly serviceVarName: string,
        private readonly callVarNames: GetPaginationCallVarNames,
    ) {
        super(
            config,
            `GetAll${StringCaseHelper.toPascalCase(config.dtoName.plural)}Service`,
        )
    }
    
    public init() {
        super.init()
        this.addMethod(
            new GmModuleServiceMethodGetPagination(
                this.getConfig(),
                this.getModuleRepository(),
                this.callVarNames,
            ),
        )
        this.api = new GmModuleServiceClassApiGetPagination(
            this.serviceVarName,
            this.getMethodByIndex(0),
        )
    }
}
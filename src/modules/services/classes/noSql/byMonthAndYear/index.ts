import {
    GmModuleServiceClassByNoSqlMonthAndYear
} from '@modules/services/classes/bases/GmModuleServiceClassByNoSqlMonthAndYear'
import {
    GmModuleServiceClassAll,
    GmModuleServiceClassCreate, GmModuleServiceClassGetAll,
} from '@modules/services/interfaces/gmModuleServiceClassCurd'
import {
    IGmModuleServiceApiAll,
    IGmModuleServiceApiCreate, IGmModuleServiceApiGetPagination,
} from '@modules/services/interfaces/gmModuleServiceClassCurdApi'
import {GmServiceActionsLoggerService} from '@services/sendActionSystemLog/GmServiceActionsLoggerService'
import {GmCrudConfig} from 'os-core-ts'
import {StringCaseHelper} from '@helpers/StringCaseHelper'
import {GmModuleServiceMethodCreate} from '@modules/services/methods/GmModuleServiceMethodCreate'
import {
    GmModuleServiceMethodGetPaginationNoSql
} from '@modules/services/methods/GmModuleServiceMethodGetPaginationNoSql'
import {
    GmModuleServiceClassApiAll,
    GmModuleServiceClassApiCreate, GmModuleServiceClassApiGetPagination,
} from '@modules/services/classes/api/GmModuleServiceClassCurdApi'


type AllCallVarNames = {
    create: CreateCallVarNames
    getPagination: GetPaginationCallVarNames
}

type CreateCallVarNames = {
    initiatorOpenUserId: string
    createDto: string
    month: string
    year: string
}

type GetPaginationCallVarNames = {
    params: string
    dateStart: string
    dateEnd: string
}

export class GmModuleServiceClassCrudByNoSqlMonthAndYear extends GmModuleServiceClassByNoSqlMonthAndYear implements GmModuleServiceClassAll {

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
        this.addAndInitMethod(
            new GmModuleServiceMethodCreate(
                this.getConfig(),
                this.getModuleRepository(),
                this.actionsLoggerService,
                this.allCallVarNames.create,
            ),
            this.allCallVarNames.create.month,
            this.allCallVarNames.create.year,
        )
        this.addMethod(new GmModuleServiceMethodGetPaginationNoSql(
            this.getConfig(),
            this.getModuleRepository(),
            this.allCallVarNames.getPagination,
            this.getLoaderRepositoryVarName()
        ))

        this.api = new GmModuleServiceClassApiAll(
            this.serviceVarName,
            this.getMethodByIndex(0),
            this.getMethodByIndex(1),
            this.getMethodByIndex(1),
            this.getMethodByIndex(1),
            this.getMethodByIndex(1),
        )
    }
}

export class GmModuleServiceClassCreateByNoSqlMonthAndYear extends GmModuleServiceClassByNoSqlMonthAndYear implements GmModuleServiceClassCreate {

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
            .addAndInitMethod(
                new GmModuleServiceMethodCreate(
                    this.getConfig(),
                    this.getModuleRepository(),
                    this.actionsLoggerService,
                    this.callVarNames,
                ),
                this.callVarNames.month,
                this.callVarNames.year,
            )

        this.api = new GmModuleServiceClassApiCreate(
            this.serviceVarName,
            this.getMethodByIndex(0),
        )
    }
}


export class GmModuleServiceClassGetAllByNoSqlMonthAndYear extends GmModuleServiceClassByNoSqlMonthAndYear implements GmModuleServiceClassGetAll {

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
        this.addMethod(new GmModuleServiceMethodGetPaginationNoSql(
            this.getConfig(),
            this.getModuleRepository(),
            this.callVarNames,
            this.getLoaderRepositoryVarName()
        ))

        this.api = new GmModuleServiceClassApiGetPagination(
            this.serviceVarName,
            this.getMethodByIndex(0),
        )
    }
}
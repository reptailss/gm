"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleRoutePaths = void 0;
const GmAbstractModuleConstant_1 = require("../abstractModule/GmAbstractModuleConstant");
const StringCaseHelper_1 = require("../../helpers/StringCaseHelper");
const GmEndpointsUrlsHelper_1 = require("../../helpers/GmEndpointsUrlsHelper");
class GmModuleRoutePaths extends GmAbstractModuleConstant_1.GmAbstractModuleConstant {
    constructor(config) {
        super(config);
    }
    getPropertyName() {
        return `${StringCaseHelper_1.StringCaseHelper.toSnakeUpperCase(this.getConfig().dtoName.plural)}_ROUTE_PATHS`;
    }
    getDirName() {
        return 'constants';
    }
    getFileName() {
        return 'routePaths.ts';
    }
    getRoutePathPropertyName(type) {
        return `${this.getPropertyName()}.${type}`;
    }
    init() {
        if (this.getConfig().model.type === 'byDatabaseNameAndYearMonth') {
            this.setBody(`
        {
            add:'/${this.getModuleKey()}${GmEndpointsUrlsHelper_1.GmEndpointsUrlsHelper.getEndpointUrl(this.getConfig(), 'add')}',
            list:'/${this.getModuleKey()}${GmEndpointsUrlsHelper_1.GmEndpointsUrlsHelper.getEndpointUrl(this.getConfig(), 'list')}',
        } as const`);
        }
        else {
            this.setBody(`
        {
            add:'/${this.getModuleKey()}${GmEndpointsUrlsHelper_1.GmEndpointsUrlsHelper.getEndpointUrl(this.getConfig(), 'add')}',
            update:'/${this.getModuleKey()}${GmEndpointsUrlsHelper_1.GmEndpointsUrlsHelper.getEndpointUrl(this.getConfig(), 'update')}/:id',
            delete:'/${this.getModuleKey()}${GmEndpointsUrlsHelper_1.GmEndpointsUrlsHelper.getEndpointUrl(this.getConfig(), 'delete')}/:id',
            get:'/${this.getModuleKey()}${GmEndpointsUrlsHelper_1.GmEndpointsUrlsHelper.getEndpointUrl(this.getConfig(), 'get')}/:id',
            list:'/${this.getModuleKey()}${GmEndpointsUrlsHelper_1.GmEndpointsUrlsHelper.getEndpointUrl(this.getConfig(), 'list')}',
        } as const`);
        }
    }
    getModuleKey() {
        return StringCaseHelper_1.StringCaseHelper.toKebabCase(this.getConfig().dtoName.plural).toLowerCase();
    }
}
exports.GmModuleRoutePaths = GmModuleRoutePaths;
//# sourceMappingURL=GmModuleRoutePaths.js.map
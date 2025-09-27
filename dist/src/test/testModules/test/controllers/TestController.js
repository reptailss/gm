"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = void 0;
const os_core_ts_1 = require("os-core-ts");
const TestValidator_1 = require("../validator/TestValidator");
const TestService_1 = require("../services/TestService");
const routePaths_1 = require("../constants/routePaths");
const testValidator = new TestValidator_1.TestValidator();
const createTestDtoSchema = testValidator.getCreateTestDtoSchema();
const updateTestDtoSchema = testValidator.getUpdateTestDtoSchema();
const testDtoPaginationQueryParamsSchema = testValidator.getTestDtoPaginationQueryParamsSchema();
let TestController = class TestController {
    constructor(testService) {
        this.testService = testService;
    }
    async create(domain, createDto, userInfo) {
        const legalEntityId = await os_core_ts_1.OsCoreLegalEntityService.getIdByDomain(domain);
        await os_core_ts_1.StructureAccessService.checkAccess({
            openUserId: userInfo.open_user_id,
            legalEntityId,
            endpoint: routePaths_1.TEST_ROUTE_PATHS.add,
        });
        const newDto = await this.testService.create({
            domain,
            initiatorOpenUserId: userInfo.open_user_id,
            createDto,
        });
        return os_core_ts_1.BuildResponseFormat.mutateRow(newDto.id);
    }
    async update(domain, updateDto, userInfo, id) {
        const legalEntityId = await os_core_ts_1.OsCoreLegalEntityService.getIdByDomain(domain);
        await os_core_ts_1.StructureAccessService.checkAccess({
            openUserId: userInfo.open_user_id,
            legalEntityId,
            endpoint: routePaths_1.TEST_ROUTE_PATHS.update,
        });
        const newDto = await this.testService.update({
            domain,
            initiatorOpenUserId: userInfo.open_user_id,
            updateDto,
            id,
        });
        return os_core_ts_1.BuildResponseFormat.mutateRow(newDto.id);
    }
    async delete(domain, userInfo, id) {
        const legalEntityId = await os_core_ts_1.OsCoreLegalEntityService.getIdByDomain(domain);
        await os_core_ts_1.StructureAccessService.checkAccess({
            openUserId: userInfo.open_user_id,
            legalEntityId,
            endpoint: routePaths_1.TEST_ROUTE_PATHS.delete,
        });
        const oldDto = await this.testService.delete({
            domain,
            initiatorOpenUserId: userInfo.open_user_id,
            id,
        });
        return os_core_ts_1.BuildResponseFormat.mutateRow(oldDto.id);
    }
    async getById(domain, userInfo, id) {
        const legalEntityId = await os_core_ts_1.OsCoreLegalEntityService.getIdByDomain(domain);
        await os_core_ts_1.StructureAccessService.checkAccess({
            openUserId: userInfo.open_user_id,
            legalEntityId,
            endpoint: routePaths_1.TEST_ROUTE_PATHS.get,
        });
        const dto = await this.testService.getById({ domain, id });
        if (!dto) {
            throw new os_core_ts_1.AppError('Not found', {
                errorKey: 'NOT_FOUND_ERROR',
            });
        }
        return os_core_ts_1.BuildResponseFormat.row(dto);
    }
    async pagination(domain, userInfo, params) {
        const legalEntityId = await os_core_ts_1.OsCoreLegalEntityService.getIdByDomain(domain);
        await os_core_ts_1.StructureAccessService.checkAccess({
            openUserId: userInfo.open_user_id,
            legalEntityId,
            endpoint: routePaths_1.TEST_ROUTE_PATHS.list,
        });
        const paginationValues = await this.testService.pagination({ domain, params });
        return os_core_ts_1.BuildResponseFormat.pagination(paginationValues);
    }
};
exports.TestController = TestController;
__decorate([
    (0, os_core_ts_1.ImportStructureServiceEndpointDec)('Add new test'),
    (0, os_core_ts_1.SwaggerInfoDec)({ summary: 'Add new test' }),
    (0, os_core_ts_1.PostDec)(routePaths_1.TEST_ROUTE_PATHS.add),
    __param(0, os_core_ts_1.DomainDec),
    __param(1, (0, os_core_ts_1.BodyDec)(createTestDtoSchema)),
    __param(2, os_core_ts_1.AuthDec),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "create", null);
__decorate([
    (0, os_core_ts_1.ImportStructureServiceEndpointDec)('Update test'),
    (0, os_core_ts_1.SwaggerInfoDec)({ summary: 'Update test by id' }),
    (0, os_core_ts_1.PutDec)(routePaths_1.TEST_ROUTE_PATHS.update),
    __param(0, os_core_ts_1.DomainDec),
    __param(1, (0, os_core_ts_1.BodyDec)(updateTestDtoSchema)),
    __param(2, os_core_ts_1.AuthDec),
    __param(3, (0, os_core_ts_1.ParamNumDec)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Number]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "update", null);
__decorate([
    (0, os_core_ts_1.ImportStructureServiceEndpointDec)('Delete test'),
    (0, os_core_ts_1.SwaggerInfoDec)({ summary: 'Delete test' }),
    (0, os_core_ts_1.DeleteDec)(routePaths_1.TEST_ROUTE_PATHS.delete),
    __param(0, os_core_ts_1.DomainDec),
    __param(1, os_core_ts_1.AuthDec),
    __param(2, (0, os_core_ts_1.ParamNumDec)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Number]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "delete", null);
__decorate([
    (0, os_core_ts_1.ImportStructureServiceEndpointDec)('Get test'),
    (0, os_core_ts_1.SwaggerInfoDec)({ summary: 'Get test by id' }),
    (0, os_core_ts_1.GetDec)(routePaths_1.TEST_ROUTE_PATHS.get),
    __param(0, os_core_ts_1.DomainDec),
    __param(1, os_core_ts_1.AuthDec),
    __param(2, (0, os_core_ts_1.ParamNumDec)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Number]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "getById", null);
__decorate([
    (0, os_core_ts_1.ImportStructureServiceEndpointDec)('Get list test'),
    (0, os_core_ts_1.SwaggerInfoDec)({ summary: 'Get test list' }),
    (0, os_core_ts_1.GetDec)(routePaths_1.TEST_ROUTE_PATHS.list),
    __param(0, os_core_ts_1.DomainDec),
    __param(1, os_core_ts_1.AuthDec),
    __param(2, (0, os_core_ts_1.PaginationQueryParamsDec)(testDtoPaginationQueryParamsSchema)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "pagination", null);
exports.TestController = TestController = __decorate([
    (0, os_core_ts_1.ControllerDec)(),
    __metadata("design:paramtypes", [TestService_1.TestService])
], TestController);
//# sourceMappingURL=TestController.js.map
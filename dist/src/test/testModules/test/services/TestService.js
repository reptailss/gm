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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestService = void 0;
const os_core_ts_1 = require("os-core-ts");
const repository_1 = require("../repository");
let TestService = class TestService {
    constructor(loaderRepository, actionsLoggerService) {
        this.loaderRepository = loaderRepository;
        this.actionsLoggerService = actionsLoggerService;
    }
    async create({ domain, initiatorOpenUserId, createDto, }) {
        const repository = await this.loaderRepository.load(domain);
        const newDto = await repository.create(createDto);
        await this.actionsLoggerService.logCreateAction({
            value: newDto,
            openUserId: initiatorOpenUserId,
            config: repository.getConfig(),
            rowId: newDto.id,
        });
        return newDto;
    }
    async update({ domain, initiatorOpenUserId, updateDto, id, }) {
        const repository = await this.loaderRepository.load(domain);
        const oldDto = await repository.findByPk(id);
        if (!oldDto) {
            throw new os_core_ts_1.AppError('Not found.', {
                errorKey: 'NOT_FOUND_ERROR',
            });
        }
        const newDto = await repository.update(updateDto, { id: id });
        await this.actionsLoggerService.logUpdateAction({
            oldValue: oldDto,
            newValue: newDto,
            openUserId: initiatorOpenUserId,
            config: repository.getConfig(),
            rowId: id,
        });
        return newDto;
    }
    async delete({ domain, initiatorOpenUserId, id, }) {
        const repository = await this.loaderRepository.load(domain);
        const oldDto = await repository.findOne({ id: id });
        if (!oldDto) {
            throw new os_core_ts_1.AppError('Not found', {
                errorKey: 'NOT_FOUND_ERROR',
            });
        }
        await repository.destroy({ id: id });
        await this.actionsLoggerService.logDeleteAction({
            oldValue: oldDto,
            openUserId: initiatorOpenUserId,
            config: repository.getConfig(),
            rowId: id,
        });
        return oldDto;
    }
    async getById({ domain, id }) {
        const repository = await this.loaderRepository.load(domain);
        return repository.findByPk(id);
    }
    async pagination({ domain, params, }) {
        const repository = await this.loaderRepository.load(domain);
        return repository.pagination(params);
    }
};
exports.TestService = TestService;
exports.TestService = TestService = __decorate([
    (0, os_core_ts_1.InjectableDec)(),
    __metadata("design:paramtypes", [repository_1.LoaderTestRepository,
        os_core_ts_1.ActionsLoggerService])
], TestService);
//# sourceMappingURL=TestService.js.map
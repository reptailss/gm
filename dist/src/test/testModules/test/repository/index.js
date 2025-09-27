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
exports.LoaderTestRepository = void 0;
const os_core_ts_1 = require("os-core-ts");
const entity_1 = require("./entity");
class TestRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async create(createDto) {
        return this.repository.create(createDto);
    }
    async update(updateDto, where) {
        return this.repository.update(updateDto, { where }, true);
    }
    async destroy(where) {
        return this.repository.destroy({ where });
    }
    async findOne(where) {
        return this.repository.findOne({ where });
    }
    async findByPk(id) {
        return this.repository.findByPk(id);
    }
    async findAll(where) {
        return this.repository.findAll({ where });
    }
    async pagination(params) {
        return this.repository.pagination(params);
    }
    getConfig() {
        return this.repository.getConfig();
    }
}
let LoaderTestRepository = class LoaderTestRepository {
    constructor(loaderSqlRepository) {
        this.loaderSqlRepository = loaderSqlRepository;
    }
    async load(domain) {
        const repository = await this.loaderSqlRepository.dynamicByDomain({
            entity: new entity_1.TestEntity(),
            tableName: 'test',
            domain,
        });
        return new TestRepository(repository);
    }
};
exports.LoaderTestRepository = LoaderTestRepository;
exports.LoaderTestRepository = LoaderTestRepository = __decorate([
    (0, os_core_ts_1.InjectableDec)(),
    __metadata("design:paramtypes", [os_core_ts_1.LoaderSqlRepository])
], LoaderTestRepository);
//# sourceMappingURL=index.js.map
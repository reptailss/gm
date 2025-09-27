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
exports.TestEntity = void 0;
const os_core_ts_1 = require("os-core-ts");
let TestEntity = class TestEntity {
};
exports.TestEntity = TestEntity;
__decorate([
    (0, os_core_ts_1.EntityPrimaryKeyDec)(),
    __metadata("design:type", String)
], TestEntity.prototype, "id", void 0);
__decorate([
    (0, os_core_ts_1.EntityDateAddDec)(),
    __metadata("design:type", String)
], TestEntity.prototype, "date_add", void 0);
__decorate([
    (0, os_core_ts_1.EntityDateUpdateDec)(),
    __metadata("design:type", String)
], TestEntity.prototype, "date_update", void 0);
__decorate([
    (0, os_core_ts_1.EntityStringDec)(),
    __metadata("design:type", String)
], TestEntity.prototype, "name", void 0);
__decorate([
    (0, os_core_ts_1.EntityIntegerDec)(),
    __metadata("design:type", Number)
], TestEntity.prototype, "age", void 0);
exports.TestEntity = TestEntity = __decorate([
    (0, os_core_ts_1.EntityDec)()
], TestEntity);
//# sourceMappingURL=entity.js.map
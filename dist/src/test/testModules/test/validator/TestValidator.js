"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestValidator = void 0;
const os_core_ts_1 = require("os-core-ts");
class TestValidator {
    getCreateTestDtoSchema() {
        return os_core_ts_1.Validator.object({ name: os_core_ts_1.Validator.string().max(255), age: os_core_ts_1.Validator.number() });
    }
    getUpdateTestDtoSchema() {
        return this.getCreateTestDtoSchema().partial();
    }
    getTestDtoSchema() {
        return this.getCreateTestDtoSchema().merge(os_core_ts_1.Validator.object({
            date_add: os_core_ts_1.Validator.date(),
            date_update: os_core_ts_1.Validator.date(),
            id: os_core_ts_1.Validator.number(),
        }));
    }
    getTestDtoPaginationQueryParamsSchema() {
        return os_core_ts_1.PaginationQueryParamsValidator.getSchema(this.getTestDtoSchema());
    }
}
exports.TestValidator = TestValidator;
//# sourceMappingURL=TestValidator.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmCrudConfigChecker = void 0;
class GmCrudConfigChecker {
    static hasActionLogger(config, endpointType) {
        if (endpointType in config.endpoints) {
            const endpoint = config.endpoints[endpointType];
            return endpoint.hasActionLogger;
        }
        return false;
    }
    static hasStructureAccess(config, endpointType) {
        if (endpointType in config.endpoints) {
            const endpoint = config.endpoints[endpointType];
            return endpoint.hasStructureAccess;
        }
        return false;
    }
    static hasAuth(config, endpointType) {
        var _a;
        const endpointAuth = (_a = config.endpoints[endpointType]) === null || _a === void 0 ? void 0 : _a.hasAuth;
        return endpointAuth ||
            (!endpointAuth && ((endpointType === 'add' || endpointType === 'update' || endpointType === 'delete') &&
                this.hasActionLogger(config, endpointType) ||
                this.hasStructureAccess(config, endpointType)));
    }
}
exports.GmCrudConfigChecker = GmCrudConfigChecker;
//# sourceMappingURL=GmCrudConfigChecker.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmServiceThrowAppError = void 0;
const GmAbstractServiceFn_1 = require("../abstractService/GmAbstractServiceFn");
class GmServiceThrowAppError extends GmAbstractServiceFn_1.GmAbstractServiceFn {
    getServiceName() {
        return 'AppError';
    }
    getExport() {
        return {
            path: 'os-core-ts',
            propertyName: 'AppError',
            isLibImport: true,
        };
    }
    throwAppError({ message, errorKey, ifConstruction, }) {
        if (ifConstruction) {
            return `if(${ifConstruction}){
                        throw new AppError('${message}',\n{ \nerrorKey:'${errorKey}'})
                    }`;
        }
        return `throw new AppError('${message}',\n{ errorKey:'${errorKey}'})`;
    }
}
exports.GmServiceThrowAppError = GmServiceThrowAppError;
//# sourceMappingURL=GmServiceThrowAppError.js.map
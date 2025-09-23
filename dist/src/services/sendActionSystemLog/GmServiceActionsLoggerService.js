"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmServiceActionsLoggerService = void 0;
const GmAbstractServiceClass_1 = require("../abstractService/GmAbstractServiceClass");
class GmServiceActionsLoggerService extends GmAbstractServiceClass_1.GmAbstractServiceClass {
    getServiceName() {
        return 'ActionsLoggerService';
    }
    getConstructorProp() {
        return {
            varName: 'actionsLoggerService',
            type: this.getServiceName(),
            privateReadOnly: true,
            defaultValue: `new ${this.getServiceName()}()`,
        };
    }
    getExport() {
        return {
            path: 'os-core-ts',
            propertyName: this.getServiceName(),
            isLibImport: true,
        };
    }
    logCreateAction({ value, rowId, initiatorOpenUserId, config, }) {
        return `
             this.actionsLoggerService.logCreateAction({
                 value: ${value},
                 openUserId: ${initiatorOpenUserId},
                 config: ${config},
                 rowId: ${rowId}
              })`;
    }
    logUpdateAction({ oldValue, newValue, config, rowId, initiatorOpenUserId, }) {
        return `
             this.actionsLoggerService.logUpdateAction({
                 oldValue: ${oldValue},
                 newValue: ${newValue},
                 openUserId: ${initiatorOpenUserId},
                 config: ${config},
                 rowId: ${rowId}
              })`;
    }
    logDeleteAction({ oldValue, initiatorOpenUserId, config, rowId, }) {
        return `
             this.actionsLoggerService.logDeleteAction({
                 oldValue: ${oldValue},
                 openUserId: ${initiatorOpenUserId},
                 config: ${config},
                 rowId: ${rowId}
              })`;
    }
}
exports.GmServiceActionsLoggerService = GmServiceActionsLoggerService;
//# sourceMappingURL=GmServiceActionsLoggerService.js.map
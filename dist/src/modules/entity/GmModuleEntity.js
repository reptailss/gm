"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleEntity = void 0;
const StringCaseHelper_1 = require("../../helpers/StringCaseHelper");
const GmAbstractModuleClass_1 = require("../abstractModule/GmAbstractModuleClass");
class EntityDec {
    getDecoratorName() {
        return 'EntityDec';
    }
    getProps() {
        return [''];
    }
    getImport() {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityDec',
        };
    }
}
class EntityPrimaryKeyDec {
    getDecoratorName() {
        return 'EntityPrimaryKeyDec';
    }
    getProps() {
        return [''];
    }
    getImport() {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityPrimaryKeyDec',
        };
    }
}
class EntityDateAddDec {
    getDecoratorName() {
        return 'EntityDateAddDec';
    }
    getProps() {
        return [''];
    }
    getImport() {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityDateAddDec',
        };
    }
}
class EntityDateUpdateDec {
    getDecoratorName() {
        return 'EntityDateUpdateDec';
    }
    getProps() {
        return [''];
    }
    getImport() {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityDateUpdateDec',
        };
    }
}
class EntityIntegerDec {
    constructor(column) {
        this.column = column;
    }
    getDecoratorName() {
        return 'EntityIntegerDec';
    }
    getProps() {
        const obj = {};
        if ('allowNull' in this.column && typeof this.column.allowNull !== 'undefined') {
            obj.allowNull = this.column.allowNull;
        }
        if ('defaultValue' in this.column && typeof this.column.defaultValue !== 'undefined') {
            obj.defaultValue = this.column.defaultValue;
        }
        if ('length' in this.column && typeof this.column.length !== 'undefined') {
            obj.length = this.column.length;
        }
        if (obj && Object.keys(obj).length >= 1) {
            return [JSON.stringify(obj, null, 2)];
        }
        return [''];
    }
    getImport() {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityIntegerDec',
        };
    }
}
class EntityBigIntDec {
    constructor(column) {
        this.column = column;
    }
    getDecoratorName() {
        return 'EntityBigIntDec';
    }
    getProps() {
        const obj = {};
        if ('allowNull' in this.column && typeof this.column.allowNull !== 'undefined') {
            obj.allowNull = this.column.allowNull;
        }
        if ('defaultValue' in this.column && typeof this.column.defaultValue !== 'undefined') {
            obj.defaultValue = this.column.defaultValue;
        }
        if (obj && Object.keys(obj).length >= 1) {
            return [JSON.stringify(obj, null, 2)];
        }
        return [''];
    }
    getImport() {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityBigIntDec',
        };
    }
}
class EntityFloatDec {
    constructor(column) {
        this.column = column;
    }
    getDecoratorName() {
        return 'EntityFloatDec';
    }
    getProps() {
        const obj = {};
        if ('allowNull' in this.column && typeof this.column.allowNull !== 'undefined') {
            obj.allowNull = this.column.allowNull;
        }
        if ('defaultValue' in this.column && typeof this.column.defaultValue !== 'undefined') {
            obj.defaultValue = this.column.defaultValue;
        }
        if (obj && Object.keys(obj).length >= 1) {
            return [JSON.stringify(obj, null, 2)];
        }
        return [''];
    }
    getImport() {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityFloatDec',
        };
    }
}
class EntityBooleanDec {
    constructor(column) {
        this.column = column;
    }
    getDecoratorName() {
        return 'EntityBooleanDec';
    }
    getProps() {
        const obj = {};
        if ('allowNull' in this.column && typeof this.column.allowNull !== 'undefined') {
            obj.allowNull = this.column.allowNull;
        }
        if ('defaultValue' in this.column && typeof this.column.defaultValue !== 'undefined') {
            obj.defaultValue = this.column.defaultValue;
        }
        if (obj && Object.keys(obj).length >= 1) {
            return [JSON.stringify(obj, null, 2)];
        }
        return [''];
    }
    getImport() {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityBooleanDec',
        };
    }
}
class EntityStringDec {
    constructor(column) {
        this.column = column;
    }
    getDecoratorName() {
        return 'EntityStringDec';
    }
    getProps() {
        const obj = {};
        if ('allowNull' in this.column && typeof this.column.allowNull !== 'undefined') {
            obj.allowNull = this.column.allowNull;
        }
        if ('defaultValue' in this.column && typeof this.column.defaultValue !== 'undefined') {
            obj.defaultValue = this.column.defaultValue;
        }
        if ('options' in this.column &&
            typeof this.column.options === 'object' &&
            'length' in this.column.options &&
            typeof this.column.options.length !== 'undefined') {
            obj.length = this.column.options.length;
        }
        if (obj && Object.keys(obj).length >= 1) {
            return [JSON.stringify(obj, null, 2)];
        }
        return [''];
    }
    getImport() {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityStringDec',
        };
    }
}
class EntityTextDec {
    constructor(column) {
        this.column = column;
    }
    getDecoratorName() {
        return 'EntityTextDec';
    }
    getProps() {
        const obj = {};
        if ('allowNull' in this.column && typeof this.column.allowNull !== 'undefined') {
            obj.allowNull = this.column.allowNull;
        }
        if ('defaultValue' in this.column && typeof this.column.defaultValue !== 'undefined') {
            obj.defaultValue = this.column.defaultValue;
        }
        if ('options' in this.column &&
            typeof this.column.options === 'object' &&
            'length' in this.column.options &&
            typeof this.column.options.length !== 'undefined') {
            obj.length = this.column.options.length;
        }
        if (obj && Object.keys(obj).length >= 1) {
            return [JSON.stringify(obj, null, 2)];
        }
        return [''];
    }
    getImport() {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityTextDec',
        };
    }
}
class EntityDateDec {
    constructor(column) {
        this.column = column;
    }
    getDecoratorName() {
        return 'EntityDateDec';
    }
    getProps() {
        const obj = {};
        if ('allowNull' in this.column && typeof this.column.allowNull !== 'undefined') {
            obj.allowNull = this.column.allowNull;
        }
        if ('defaultValue' in this.column && typeof this.column.defaultValue !== 'undefined') {
            obj.defaultValue = this.column.defaultValue;
        }
        if (obj && Object.keys(obj).length >= 1) {
            return [JSON.stringify(obj, null, 2)];
        }
        return [''];
    }
    getImport() {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityDateDec',
        };
    }
}
class EntityJsonDec {
    constructor(column) {
        this.column = column;
    }
    getDecoratorName() {
        return 'EntityJsonDec';
    }
    getProps() {
        const obj = {};
        if ('allowNull' in this.column && typeof this.column.allowNull !== 'undefined') {
            obj.allowNull = this.column.allowNull;
        }
        if ('defaultValue' in this.column && typeof this.column.defaultValue !== 'undefined') {
            obj.defaultValue = this.column.defaultValue;
        }
        if (obj && Object.keys(obj).length >= 1) {
            return [JSON.stringify(obj, null, 2)];
        }
        return [''];
    }
    getImport() {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityJsonDec',
        };
    }
}
class GmModuleEntity extends GmAbstractModuleClass_1.GmAbstractModuleClass {
    getPropertyName() {
        return `${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Entity`;
    }
    getDirName() {
        return null;
    }
    getFileName() {
        return 'entity.ts';
    }
    init() {
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'EntityDec',
            isLibImport: true,
        });
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'EntityPrimaryKey',
            isLibImport: true,
        });
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'EntityDateAdd',
            isLibImport: true,
        });
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'EntityDateUpdate',
            isLibImport: true,
        });
        this.addVar({
            type: 'EntityPrimaryKey',
            defaultValue: null,
            nullable: false,
            optional: false,
            readonly: false,
            scope: 'public',
            varName: `id!`,
            decorator: new EntityPrimaryKeyDec(),
        });
        this.addVar({
            type: 'EntityDateAdd',
            defaultValue: null,
            nullable: false,
            optional: false,
            readonly: false,
            scope: 'public',
            varName: `date_add!`,
            decorator: new EntityDateAddDec(),
        });
        this.addVar({
            type: 'EntityDateUpdate',
            defaultValue: null,
            nullable: false,
            optional: false,
            readonly: false,
            scope: 'public',
            varName: `date_update!`,
            decorator: new EntityDateUpdateDec(),
        });
        const columns = this.gmGetColumnRepositoryFromConfig();
        for (const { column, key } of columns) {
            this.addVar({
                type: this.getPropTypeByColumn(column),
                defaultValue: null,
                nullable: false,
                optional: false,
                readonly: false,
                scope: 'public',
                varName: `${key}!`,
                decorator: this.getDecoratorByColumn(column),
            });
        }
        this.addDecorator(new EntityDec());
    }
    gmGetColumnRepositoryFromConfig() {
        const res = [];
        for (const key in this.getConfig().repository.columns) {
            const column = this.getConfig().repository.columns[key];
            res.push({
                key,
                column,
            });
        }
        return res;
    }
    getPropTypeByColumn(column) {
        switch (column.type) {
            case 'BIGINT':
                return 'number';
            case 'FLOAT':
                return 'number';
            case 'INTEGER':
                return 'number';
            case 'TEXT':
                return 'string';
            case 'JSON':
                return 'object';
            case 'DATETIME':
                return 'Date';
            case 'BOOLEAN':
                return 'boolean';
            case 'STRING':
                return 'string';
            case 'OBJECT':
                return 'object';
            default:
                return 'string';
        }
    }
    getDecoratorByColumn(column) {
        switch (column.type) {
            case 'BIGINT':
                return new EntityBigIntDec(column);
            case 'FLOAT':
                return new EntityFloatDec(column);
            case 'INTEGER':
                return new EntityIntegerDec(column);
            case 'TEXT':
                return new EntityTextDec(column);
            case 'JSON':
                return new EntityJsonDec(column);
            case 'DATETIME':
                return new EntityDateDec(column);
            case 'BOOLEAN':
                return new EntityBooleanDec(column);
            case 'STRING':
                return new EntityStringDec(column);
            case 'OBJECT':
                return new EntityJsonDec(column);
            default:
                return undefined;
        }
    }
}
exports.GmModuleEntity = GmModuleEntity;
//# sourceMappingURL=GmModuleEntity.js.map
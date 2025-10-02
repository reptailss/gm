"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleEntity = void 0;
const StringCaseHelper_1 = require("../../helpers/StringCaseHelper");
const GmAbstractModuleClass_1 = require("../abstractModule/GmAbstractModuleClass");
class EntityDec {
    getDecoratorName() {
        return 'EntityDb';
    }
    getProps() {
        return [''];
    }
    getImport() {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityDb',
        };
    }
}
class EntityPrimaryNumberKeyDec {
    getDecoratorName() {
        return 'EntityPrimaryNumberKey';
    }
    getProps() {
        return [''];
    }
    getImport() {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityPrimaryNumberKey',
        };
    }
}
class EntityPrimaryStringKeyDec {
    getDecoratorName() {
        return 'EntityPrimaryStringKey';
    }
    getProps() {
        return [''];
    }
    getImport() {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityPrimaryStringKey',
        };
    }
}
class EntityDateAddDec {
    getDecoratorName() {
        return 'EntityDateAdd';
    }
    getProps() {
        return [''];
    }
    getImport() {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityDateAdd',
        };
    }
}
class EntityDateUpdateDec {
    getDecoratorName() {
        return 'EntityDateUpdate';
    }
    getProps() {
        return [''];
    }
    getImport() {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityDateUpdate',
        };
    }
}
class EntityIntegerDec {
    constructor(column) {
        this.column = column;
    }
    getDecoratorName() {
        return 'EntityInteger';
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
            propertyName: 'EntityInteger',
        };
    }
}
class EntityBigIntDec {
    constructor(column) {
        this.column = column;
    }
    getDecoratorName() {
        return 'EntityBigInt';
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
            propertyName: 'EntityBigInt',
        };
    }
}
class EntityFloatDec {
    constructor(column) {
        this.column = column;
    }
    getDecoratorName() {
        return 'EntityFloat';
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
            propertyName: 'EntityFloat',
        };
    }
}
class EntityBooleanDec {
    constructor(column) {
        this.column = column;
    }
    getDecoratorName() {
        return 'EntityBoolean';
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
            propertyName: 'EntityBoolean',
        };
    }
}
class EntityStringDec {
    constructor(column) {
        this.column = column;
    }
    getDecoratorName() {
        return 'EntityString';
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
            propertyName: 'EntityString',
        };
    }
}
class EntityTextDec {
    constructor(column) {
        this.column = column;
    }
    getDecoratorName() {
        return 'EntityText';
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
            propertyName: 'EntityText',
        };
    }
}
class EntityDateDec {
    constructor(column) {
        this.column = column;
    }
    getDecoratorName() {
        return 'EntityDate';
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
            propertyName: 'EntityDate',
        };
    }
}
class EntityJsonDec {
    constructor(column) {
        this.column = column;
    }
    getDecoratorName() {
        return 'EntityJson';
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
            propertyName: 'EntityJson',
        };
    }
}
class GmModuleEntity extends GmAbstractModuleClass_1.GmAbstractModuleClass {
    getPropertyName() {
        return `${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Entity`;
    }
    getDirName() {
        return 'repository';
    }
    getFileName() {
        return 'entity.ts';
    }
    init() {
        if (this.getConfig().repository.dbType === 'noSql') {
            this.addVar({
                type: 'PrimaryStringKey',
                defaultValue: null,
                nullable: false,
                optional: false,
                readonly: false,
                scope: 'public',
                varName: `_id!`,
                decorator: new EntityPrimaryStringKeyDec(),
            });
            this.addImport({
                path: 'os-core-ts',
                propertyName: 'PrimaryStringKey',
                isLibImport: true,
            });
        }
        else {
            this.addVar({
                type: 'PrimaryNumberKey',
                defaultValue: null,
                nullable: false,
                optional: false,
                readonly: false,
                scope: 'public',
                varName: `id!`,
                decorator: new EntityPrimaryNumberKeyDec(),
            });
            this.addImport({
                path: 'os-core-ts',
                propertyName: 'PrimaryNumberKey',
                isLibImport: true,
            });
        }
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'DateAdd',
            isLibImport: true,
        });
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'DateUpdate',
            isLibImport: true,
        });
        this.addVar({
            type: 'DateAdd',
            defaultValue: null,
            nullable: false,
            optional: false,
            readonly: false,
            scope: 'public',
            varName: `date_add!`,
            decorator: new EntityDateAddDec(),
        });
        this.addVar({
            type: 'DateUpdate',
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
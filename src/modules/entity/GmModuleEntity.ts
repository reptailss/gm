import {IGmModuleClass} from '@modules/interfaces/gmModule'
import {StringCaseHelper} from '@helpers/StringCaseHelper'
import {GmRepositoryNoSqlColumn, GmRepositorySqlColumn} from 'os-core-ts'
import {GmAbstractModuleClass} from '@modules/abstractModule/GmAbstractModuleClass'
import {IGmModuleClassDecorator} from '@decorators/interfaces/gmModuleClassDecorator'
import {GmImport} from '@imports/types'
import {IGmModuleClassMethodPropDecorator} from '@decorators/interfaces/gmModuleClassMethodPropDecorator'


class EntityDec implements IGmModuleClassDecorator {
    public getDecoratorName(): string {
        return 'EntityDb'
    }
    
    public getProps(): string[] {
        return ['']
    }
    
    public getImport(): GmImport {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityDb',
        }
    }
}

class EntityPrimaryNumberKeyDec implements IGmModuleClassDecorator {
    public getDecoratorName(): string {
        return 'EntityPrimaryNumberKey'
    }
    
    public getProps(): string[] {
        return ['']
    }
    
    public getImport(): GmImport {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityPrimaryNumberKey',
        }
    }
}

class EntityDateAddDec implements IGmModuleClassDecorator {
    public getDecoratorName(): string {
        return 'EntityDateAdd'
    }
    
    public getProps(): string[] {
        return ['']
    }
    
    public getImport(): GmImport {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityDateAdd',
        }
    }
}

class EntityDateUpdateDec implements IGmModuleClassDecorator {
    public getDecoratorName(): string {
        return 'EntityDateUpdate'
    }
    
    public getProps(): string[] {
        return ['']
    }
    
    public getImport(): GmImport {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityDateUpdate',
        }
    }
}

class EntityIntegerDec implements IGmModuleClassDecorator {
    
    constructor(private readonly column: GmRepositorySqlColumn | GmRepositoryNoSqlColumn) {
    }
    
    public getDecoratorName(): string {
        return 'EntityInteger'
    }
    
    public getProps(): string[] {
        const obj: {
            allowNull?: boolean
            defaultValue?: string | null
            length?: number | string
        } = {}
        
        if ('allowNull' in this.column && typeof this.column.allowNull !== 'undefined') {
            obj.allowNull = this.column.allowNull
        }
        
        if ('defaultValue' in this.column && typeof this.column.defaultValue !== 'undefined') {
            obj.defaultValue = this.column.defaultValue as any
        }
        
        if ('length' in this.column && typeof this.column.length !== 'undefined') {
            obj.length = this.column.length as any
        }
        
        if (obj && Object.keys(obj).length >= 1) {
            return [JSON.stringify(obj, null, 2)]
        }
        return ['']
    }
    
    public getImport(): GmImport {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityInteger',
        }
    }
}

class EntityBigIntDec implements IGmModuleClassDecorator {
    
    constructor(private readonly column: GmRepositorySqlColumn | GmRepositoryNoSqlColumn) {
    }
    
    
    public getDecoratorName(): string {
        return 'EntityBigInt'
    }
    
    public getProps(): string[] {
        const obj: {
            allowNull?: boolean
            defaultValue?: string | null
        } = {}
        
        if ('allowNull' in this.column && typeof this.column.allowNull !== 'undefined') {
            obj.allowNull = this.column.allowNull
        }
        
        if ('defaultValue' in this.column && typeof this.column.defaultValue !== 'undefined') {
            obj.defaultValue = this.column.defaultValue as any
        }
        
        if (obj && Object.keys(obj).length >= 1) {
            return [JSON.stringify(obj, null, 2)]
        }
        return ['']
    }
    
    public getImport(): GmImport {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityBigInt',
        }
    }
}

class EntityFloatDec implements IGmModuleClassDecorator {
    
    constructor(private readonly column: GmRepositorySqlColumn | GmRepositoryNoSqlColumn) {
    }
    
    
    public getDecoratorName(): string {
        return 'EntityFloat'
    }
    
    public getProps(): string[] {
        const obj: {
            allowNull?: boolean
            defaultValue?: string | null
        } = {}
        
        if ('allowNull' in this.column && typeof this.column.allowNull !== 'undefined') {
            obj.allowNull = this.column.allowNull
        }
        
        if ('defaultValue' in this.column && typeof this.column.defaultValue !== 'undefined') {
            obj.defaultValue = this.column.defaultValue as any
        }
        
        if (obj && Object.keys(obj).length >= 1) {
            return [JSON.stringify(obj, null, 2)]
        }
        return ['']
    }
    
    public getImport(): GmImport {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityFloat',
        }
    }
}

class EntityBooleanDec implements IGmModuleClassDecorator {
    constructor(private readonly column: GmRepositorySqlColumn | GmRepositoryNoSqlColumn) {
    }
    
    
    public getDecoratorName(): string {
        return 'EntityBoolean'
    }
    
    public getProps(): string[] {
        const obj: {
            allowNull?: boolean
            defaultValue?: string | null
        } = {}
        
        if ('allowNull' in this.column && typeof this.column.allowNull !== 'undefined') {
            obj.allowNull = this.column.allowNull
        }
        
        if ('defaultValue' in this.column && typeof this.column.defaultValue !== 'undefined') {
            obj.defaultValue = this.column.defaultValue as any
        }
        
        if (obj && Object.keys(obj).length >= 1) {
            return [JSON.stringify(obj, null, 2)]
        }
        return ['']
    }
    
    public getImport(): GmImport {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityBoolean',
        }
    }
}

class EntityStringDec implements IGmModuleClassDecorator {
    constructor(private readonly column: GmRepositorySqlColumn | GmRepositoryNoSqlColumn) {
    }
    
    
    public getDecoratorName(): string {
        return 'EntityString'
    }
    
    public getProps(): string[] {
        const obj: {
            allowNull?: boolean
            defaultValue?: string | null
            length?: number | string
        } = {}
        
        if ('allowNull' in this.column && typeof this.column.allowNull !== 'undefined') {
            obj.allowNull = this.column.allowNull
        }
        
        if ('defaultValue' in this.column && typeof this.column.defaultValue !== 'undefined') {
            obj.defaultValue = this.column.defaultValue as any
        }
        
        if (
            'options' in this.column &&
            typeof this.column.options === 'object' &&
            'length' in this.column.options &&
            typeof this.column.options.length !== 'undefined'
        ) {
            obj.length = this.column.options.length as any
        }
        
        if (obj && Object.keys(obj).length >= 1) {
            return [JSON.stringify(obj, null, 2)]
        }
        return ['']
    }
    
    public getImport(): GmImport {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityString',
        }
    }
}

class EntityTextDec implements IGmModuleClassDecorator {
    
    constructor(private readonly column: GmRepositorySqlColumn | GmRepositoryNoSqlColumn) {
    }
    
    public getDecoratorName(): string {
        return 'EntityText'
    }
    
    public getProps(): string[] {
        const obj: {
            allowNull?: boolean
            defaultValue?: string | null
            length?: number | string
        } = {}
        
        if ('allowNull' in this.column && typeof this.column.allowNull !== 'undefined') {
            obj.allowNull = this.column.allowNull
        }
        
        if ('defaultValue' in this.column && typeof this.column.defaultValue !== 'undefined') {
            obj.defaultValue = this.column.defaultValue as any
        }
        
        if (
            'options' in this.column &&
            typeof this.column.options === 'object' &&
            'length' in this.column.options &&
            typeof this.column.options.length !== 'undefined'
        ) {
            obj.length = this.column.options.length as any
        }
        
        if (obj && Object.keys(obj).length >= 1) {
            return [JSON.stringify(obj, null, 2)]
        }
        return ['']
    }
    
    public getImport(): GmImport {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityText',
        }
    }
}

class EntityDateDec implements IGmModuleClassDecorator {
    constructor(private readonly column: GmRepositorySqlColumn | GmRepositoryNoSqlColumn) {
    }
    
    
    public getDecoratorName(): string {
        return 'EntityDate'
    }
    
    public getProps(): string[] {
        const obj: {
            allowNull?: boolean
            defaultValue?: string | null
        } = {}
        
        if ('allowNull' in this.column && typeof this.column.allowNull !== 'undefined') {
            obj.allowNull = this.column.allowNull
        }
        
        if ('defaultValue' in this.column && typeof this.column.defaultValue !== 'undefined') {
            obj.defaultValue = this.column.defaultValue as any
        }
        
        if (obj && Object.keys(obj).length >= 1) {
            return [JSON.stringify(obj, null, 2)]
        }
        return ['']
    }
    
    public getImport(): GmImport {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityDate',
        }
    }
}

class EntityJsonDec implements IGmModuleClassDecorator {
    
    constructor(private readonly column: GmRepositorySqlColumn | GmRepositoryNoSqlColumn) {
    }
    
    public getDecoratorName(): string {
        return 'EntityJson'
    }
    
    public getProps(): string[] {
        const obj: {
            allowNull?: boolean
            defaultValue?: string | null
        } = {}
        
        if ('allowNull' in this.column && typeof this.column.allowNull !== 'undefined') {
            obj.allowNull = this.column.allowNull
        }
        
        if ('defaultValue' in this.column && typeof this.column.defaultValue !== 'undefined') {
            obj.defaultValue = this.column.defaultValue as any
        }
        
        if (obj && Object.keys(obj).length >= 1) {
            return [JSON.stringify(obj, null, 2)]
        }
        return ['']
    }
    
    public getImport(): GmImport {
        return {
            isLibImport: true,
            path: 'os-core-ts',
            propertyName: 'EntityJson',
        }
    }
}


export class GmModuleEntity extends GmAbstractModuleClass implements IGmModuleClass {
    
    public getPropertyName(): string {
        return `${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Entity`
    }
    
    public getDirName(): string | null {
        return 'repository'
    }
    
    public getFileName(): string {
        return 'entity.ts'
    }
    
    public init(): void {
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'Entity',
            isLibImport: true,
        })
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'PrimaryNumberKey',
            isLibImport: true,
        })
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'DateAdd',
            isLibImport: true,
        })
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'DateUpdate',
            isLibImport: true,
        })
        this.addVar({
            type: 'PrimaryNumberKey',
            defaultValue: null,
            nullable: false,
            optional: false,
            readonly: false,
            scope: 'public',
            varName: `id!`,
            decorator: new EntityPrimaryNumberKeyDec(),
        })
        this.addVar({
            type: 'DateAdd',
            defaultValue: null,
            nullable: false,
            optional: false,
            readonly: false,
            scope: 'public',
            varName: `date_add!`,
            decorator: new EntityDateAddDec(),
        })
        this.addVar({
            type: 'DateUpdate',
            defaultValue: null,
            nullable: false,
            optional: false,
            readonly: false,
            scope: 'public',
            varName: `date_update!`,
            decorator: new EntityDateUpdateDec(),
        })
        const columns = this.gmGetColumnRepositoryFromConfig()
        for (const {
            column,
            key
        } of columns) {
            this.addVar({
                type: this.getPropTypeByColumn(column),
                defaultValue: null,
                nullable: false,
                optional: false,
                readonly: false,
                scope: 'public',
                varName: `${key}!`,
                decorator: this.getDecoratorByColumn(column),
            })
        }
        this.addDecorator(new EntityDec())
    }
    
    
    private gmGetColumnRepositoryFromConfig(): {
        key: string
        column: GmRepositorySqlColumn | GmRepositoryNoSqlColumn
    }[] {
        const res: {
            key: string
            column: GmRepositorySqlColumn | GmRepositoryNoSqlColumn
        }[] = []
        
        for (const key in this.getConfig().repository.columns) {
            const column = this.getConfig().repository.columns[key]
            res.push({
                key,
                column,
            })
        }
        return res
    }
    
    private getPropTypeByColumn(column: GmRepositorySqlColumn | GmRepositoryNoSqlColumn) {
        switch (column.type) {
            case 'BIGINT':
                return 'number'
            case 'FLOAT':
                return 'number'
            case 'INTEGER':
                return 'number'
            case 'TEXT':
                return 'string'
            case 'JSON':
                return 'object'
            case 'DATETIME':
                return 'Date'
            case 'BOOLEAN':
                return 'boolean'
            case 'STRING':
                return 'string'
            case 'OBJECT':
                return 'object'
            default :
                return 'string'
        }
    }
    
    private getDecoratorByColumn(column: GmRepositorySqlColumn | GmRepositoryNoSqlColumn): IGmModuleClassMethodPropDecorator | undefined {
        
        switch (column.type) {
            case 'BIGINT':
                return new EntityBigIntDec(column)
            case 'FLOAT':
                return new EntityFloatDec(column)
            case 'INTEGER':
                return new EntityIntegerDec(column)
            
            case 'TEXT':
                return new EntityTextDec(column)
            case 'JSON':
                return new EntityJsonDec(column)
            case 'DATETIME':
                return new EntityDateDec(column)
            case 'BOOLEAN':
                return new EntityBooleanDec(column)
            case 'STRING':
                return new EntityStringDec(column)
            case 'OBJECT':
                return new EntityJsonDec(column)
            default :
                return undefined
        }
        
    }
    
    
}

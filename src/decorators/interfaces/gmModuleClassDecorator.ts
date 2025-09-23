import {GmImport} from '@imports/types'

export interface IGmModuleClassDecorator{

    getDecoratorName(): string

    getProps():string[]

    getImport(): GmImport
}
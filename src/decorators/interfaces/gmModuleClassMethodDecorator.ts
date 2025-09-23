import {GmImport} from '@imports/types'

export interface IGmModuleClassMethodDecorator{

    getDecoratorName(): string

    getProps():string[]

    getImport(): GmImport
}
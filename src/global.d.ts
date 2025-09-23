import 'express'
import {
    IGmRenderModuleClass,
    IGmRenderModuleClassMethod,
    IGmRenderModuleConstant,
    IGmRenderModuleFn,
    IGmRenderModuleType,
} from '@gm/core'


declare global {
    const gmRenderModuleConstant: IGmRenderModuleConstant
    const gmRenderModuleFn: IGmRenderModuleFn
    const gmRenderModuleClassMethod: IGmRenderModuleClassMethod
    const gmRenderModuleClass: IGmRenderModuleClass
    const gmRenderModuleType: IGmRenderModuleType
}


declare module '*.txt' {
}

declare module '*.ejs' {
    const template: (data: {
        gmRenderModuleConstant: IGmRenderModuleConstant
        gmRenderModuleFn: IGmRenderModuleFn
        gmRenderModuleClassMethod: IGmRenderModuleClassMethod
        gmRenderModuleClass: IGmRenderModuleClass
        gmRenderModuleType: IGmRenderModuleType
    }) => string
    export default template
}

// declare module 'os-core-ts' {
//     export type GmConfig = any;
//     export type GmSqlModelConfig = any;
//     export type GmNoSqlModelConfig = any;
//
//     const value: any;
//     export default value;
// }

export {}
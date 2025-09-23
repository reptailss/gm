import {IGmRenderModule} from '@render/interfaces/gmRenderModule'

export interface IGmRenderModuleConstant extends IGmRenderModule {

    renderBody(): string

    renderType(): string

    getData<T>(key: string): T

    getExportMarkIfExported():string

    renderImports(): string
}


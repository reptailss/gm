import {IGmRenderModule} from '@render/interfaces/gmRenderModule'

export interface IGmRenderModuleType extends IGmRenderModule {

    renderBody(): string

    getData<T>(key: string): T

    getExportMarkIfExported():string

    renderImports(): string
}


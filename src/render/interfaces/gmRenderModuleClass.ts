import {IGmRenderModule} from '@render/interfaces/gmRenderModule'

export interface IGmRenderModuleClass extends IGmRenderModule {

    renderConstructorProps(): string

    renderDecorators(): string

    getExportMarkIfExported(): string

    renderImports(): string

    renderClass(): string


}


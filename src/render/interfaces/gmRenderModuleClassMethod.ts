import {IGmRenderModule} from '@render/interfaces/gmRenderModule'

export interface IGmRenderModuleClassMethod extends IGmRenderModule {

    renderBody(): string

    renderProps(): string

    renderReturnType(): string

    renderScope():string

    renderAsyncType():string

    getData(value: string): unknown

    renderDecorators(value: string): string

}


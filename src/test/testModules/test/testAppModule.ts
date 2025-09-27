import {AppModule} from 'os-core-ts'
import {TestController} from '@testModules/test/controllers/TestController'

export const testAppModule = new AppModule({
    controllers: [TestController],
    swaggerInfo: {
        tag: 'Test',
    },
})

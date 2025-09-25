
import { AppService } from './app'
import { appLogger } from 'os-core-ts'

new AppService().init().then(()=>{
    appLogger.info('App Service init')
})
        
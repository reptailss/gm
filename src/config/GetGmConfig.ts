import path from 'path'
import {GmConfig} from '@config/types'
import {gmDefaultConfig} from '@config/gmDefaultConfig'
import {GmWriteDefaultConfig} from '@config/GmWriteDefaultConfig'


export class GetGmConfig {
    static async getConfig(): Promise<GmConfig> {
        try {
            const configPath = path.resolve(process.cwd(), 'gCrudConfig.ts')
            const configFile = await import(configPath)
            if (configFile?.default && typeof configFile.default === 'function') {
                return configFile.default()
            }
            return gmDefaultConfig.default
            
        } catch (error) {
            console.log(error, 'error import config')
            GmWriteDefaultConfig.write()
            return gmDefaultConfig.default
        }
        
    }
}
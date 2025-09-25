import path from 'path'
import {GmCrudConfig} from 'os-core-ts'
import {gmCrudDefaultConfig} from '@crudConfig/gmCrudDefaultConfig'
import {GmCrudWriteDefaultConfig} from '@crudConfig/GmCrudWriteDefaultConfig'
import 'ts-node/register'

export class GetGmCrudConfig {
    static async getConfig(): Promise<GmCrudConfig> {
        try {
            const configPath = path.resolve(process.cwd(), 'gCrudConfig.ts');
            const configFile = await import(configPath);
            if (configFile?.default && typeof configFile.default === 'function') {
                return configFile.default();
            }
            return gmCrudDefaultConfig.default;
        } catch (error) {
            console.log(error, 'error import config');
            GmCrudWriteDefaultConfig.write();
            return gmCrudDefaultConfig.default;
        }
        
    }
}
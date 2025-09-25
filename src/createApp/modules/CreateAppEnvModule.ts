import fs from 'fs'
import path from 'path'
import {CreateAppConfig} from '@createApp/config/types'



export class CreateAppEnvModule {
    constructor(
        private readonly packageName: string,
        private readonly config: CreateAppConfig
    ) {}
    
    public create(): void {
        const rootDir = process.cwd()
        const envPath = path.join(rootDir, this.packageName, '.env')
        const res: { key: string; value: string }[] = []
        
        res.push(
            { key: 'INIT_SERVICE_PORT', value: this.getEnvValue('INIT_SERVICE_PORT') || '3000' },
            { key: 'INIT_SERVICE_KEY', value: this.packageName },
            { key: 'INIT_SERVICE_PREFIX', value: this.getEnvValue('INIT_SERVICE_PREFIX') },
            { key: 'INIT_SYSTEM_AUTH_TOKEN', value: this.getEnvValue('INIT_SYSTEM_AUTH_TOKEN') },
            { key: 'INIT_HAS_CORS', value: this.getEnvValue('INIT_HAS_CORS') || '1' },
            { key: 'INIT_USE_SWAGGER', value: this.getEnvValue('INIT_USE_SWAGGER') || '1' },
            { key: 'INIT_URL_FOR_CHECK_AUTH', value: this.getEnvValue('INIT_URL_FOR_CHECK_AUTH') },
            { key: 'INIT_SWAGGER_DEFAULT_AUTH_TOKEN', value: this.getEnvValue('INIT_SWAGGER_DEFAULT_AUTH_TOKEN') }
        )
        
        if (this.config.hasDynamicSql) {
            res.push(
                { key: 'INIT_SQL_DYNAMIC_DB_HOST', value: this.getEnvValue('INIT_SQL_DYNAMIC_DB_HOST') },
                { key: 'INIT_SQL_DYNAMIC_DB_PORT', value: this.getEnvValue('INIT_SQL_DYNAMIC_DB_PORT') },
                { key: 'INIT_SQL_DYNAMIC_DB_USERNAME', value: this.getEnvValue('INIT_SQL_DYNAMIC_DB_USERNAME') },
                { key: 'INIT_SQL_DYNAMIC_DB_PASSWORD', value: this.getEnvValue('INIT_SQL_DYNAMIC_DB_PASSWORD') }
            )
        }
        
        if (this.config.hasStaticSql) {
            res.push(
                { key: 'INIT_SQL_STATIC_DB_DATABASE', value: this.getEnvValue('INIT_SQL_STATIC_DB_DATABASE') },
                { key: 'INIT_SQL_STATIC_DB_HOST', value: this.getEnvValue('INIT_SQL_STATIC_DB_HOST') },
                { key: 'INIT_SQL_STATIC_DB_PORT', value: this.getEnvValue('INIT_SQL_STATIC_DB_PORT') },
                { key: 'INIT_SQL_STATIC_DB_USERNAME', value: this.getEnvValue('INIT_SQL_STATIC_DB_USERNAME') },
                { key: 'INIT_SQL_STATIC_DB_PASSWORD', value: this.getEnvValue('INIT_SQL_STATIC_DB_PASSWORD') }
            )
        }
        
        if (this.config.hasMongo) {
            res.push(
                { key: 'INIT_MONGODB_PROTOCOL', value: this.getEnvValue('INIT_MONGODB_PROTOCOL') },
                { key: 'INIT_MONGODB_HOST', value: this.getEnvValue('INIT_MONGODB_HOST') },
                { key: 'INIT_MONGODB_PORT', value: this.getEnvValue('INIT_MONGODB_PORT') },
                { key: 'INIT_MONGODB_USER', value: this.getEnvValue('INIT_MONGODB_USER') },
                { key: 'INIT_MONGODB_PASSWORD', value: this.getEnvValue('INIT_MONGODB_PASSWORD') },
                { key: 'INIT_MONGODB_OPTIONS', value: this.getEnvValue('INIT_MONGODB_OPTIONS') }
            )
        }
        
        const lines = res.map(({ key, value }) => `${key}=${value}`)
        
        fs.writeFileSync(envPath, lines.join('\n') + '\n', { encoding: 'utf-8' })
    }
    
    private getEnvValue(key:string){
        if(key in this.config.env){
            return this.config.env[key]
        }
        return  ''
    }
}

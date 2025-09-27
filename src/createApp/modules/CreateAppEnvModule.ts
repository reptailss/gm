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
            { key: 'INIT_SERVICE_KEY', value: this.packageName },
            { key: 'INIT_SERVICE_PREFIX', value: this.getEnvValue('INIT_SERVICE_PREFIX') },
            { key: 'INIT_SYSTEM_AUTH_TOKEN', value: this.getEnvValue('INIT_SYSTEM_AUTH_TOKEN') },
        )
        
        if (this.config.hasDynamicSql) {
            res.push(
                { key: 'INIT_SQL_DYNAMIC_DB_HOST', value: this.getEnvValue('INIT_SQL_DYNAMIC_DB_HOST') },
                { key: 'INIT_SQL_DYNAMIC_DB_PORT', value: this.getEnvValue('INIT_SQL_DYNAMIC_DB_PORT') },
                { key: 'INIT_SQL_DYNAMIC_DB_USERNAME', value: this.getEnvValue('INIT_SQL_DYNAMIC_DB_USERNAME') },
                { key: 'INIT_SQL_DYNAMIC_DB_PASSWORD', value: this.getEnvValue('INIT_SQL_DYNAMIC_DB_PASSWORD') },
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
        
        if(this.config.hasStaticRedis){
            res.push(
                { key: 'INIT_REDIS_STATIC_HOST', value: this.getEnvValue('INIT_REDIS_STATIC_HOST') },
                { key: 'INIT_REDIS_STATIC_PORT', value: this.getEnvValue('INIT_REDIS_STATIC_PORT') },
                { key: 'INIT_REDIS_STATIC_PASSWORD', value: this.getEnvValue('INIT_REDIS_STATIC_PASSWORD') },
            )
        }
        
        if(this.config.hasDynamicSql){
            res.push(
                { key: 'INIT_REDIS_DYNAMIC_HOST', value: this.getEnvValue('INIT_REDIS_DYNAMIC_HOST') },
                { key: 'INIT_REDIS_DYNAMIC_PORT', value: this.getEnvValue('INIT_REDIS_DYNAMIC_PORT') },
                { key: 'INIT_REDIS_DYNAMIC_PASSWORD', value: this.getEnvValue('INIT_REDIS_DYNAMIC_PASSWORD') },
            )
        }
        
        res.push(
            { key: 'INIT_URL_AUTH_SERVICE', value: this.getEnvValue('INIT_URL_AUTH_SERVICE') },
            { key: 'INIT_URL_FOR_CHECK_AUTH', value: this.getEnvValue('INIT_URL_FOR_CHECK_AUTH') },
            { key: 'INIT_URL_TO_ACTIONS_SYSTEM_LOGGER_SERVICE', value: this.getEnvValue('INIT_URL_TO_ACTIONS_SYSTEM_LOGGER_SERVICE') },
            { key: 'INIT_URL_OS_STATUS_SERVICE', value: this.getEnvValue('INIT_URL_OS_STATUS_SERVICE') },
        )
        
        
        res.push(
            { key: 'INIT_SERVICE_PORT', value: this.getEnvValue('INIT_SERVICE_PORT') },
            { key: 'INIT_USE_SWAGGER', value: this.getEnvValue('INIT_USE_SWAGGER') },
            { key: 'INIT_HAS_CORS', value: this.getEnvValue('INIT_HAS_CORS') },
            { key: 'INIT_HAS_CONSOLE_LOGGER_REQUESTS', value: this.getEnvValue('INIT_HAS_CONSOLE_LOGGER_REQUESTS') },
            { key: 'INIT_HAS_SEND_ACTION_SYSTEM_LOGGER', value: this.getEnvValue('INIT_HAS_SEND_ACTION_SYSTEM_LOGGER') },
            { key: 'INIT_SWAGGER_URL', value: this.getEnvValue('INIT_SWAGGER_URL') },
            { key: 'INIT_SWAGGER_DEFAULT_AUTH_TOKEN', value: this.getEnvValue('INIT_SWAGGER_DEFAULT_AUTH_TOKEN') },
        )
        
        if(this.config.hasDynamicSql){
            res.push(
                { key: 'INIT_REDIS_CLIENT_DATABASE_PREFIX', value: this.getEnvValue('INIT_REDIS_CLIENT_DATABASE_PREFIX') },
                { key: 'INIT_SQL_DYNAMIC_DB_DIALECT', value: this.getEnvValue('INIT_SQL_DYNAMIC_DB_DIALECT') },
                { key: 'INIT_SQL_DYNAMIC_DB_ENCODING', value: this.getEnvValue('INIT_SQL_DYNAMIC_DB_ENCODING') },
                { key: 'INIT_SQL_DYNAMIC_DB_TIMEZONE', value: this.getEnvValue('INIT_SQL_DYNAMIC_DB_TIMEZONE') },
                { key: 'INIT_SQL_DYNAMIC_CHECK_READINESS_DATABASE_NAME', value: this.getEnvValue('INIT_SQL_DYNAMIC_CHECK_READINESS_DATABASE_NAME') },
            )
        }
        
        if(this.config.hasStaticSql){
            res.push(
                { key: 'INIT_SQL_STATIC_DB_DIALECT', value: this.getEnvValue('INIT_SQL_STATIC_DB_DIALECT') },
                { key: 'INIT_SQL_STATIC_DB_ENCODING', value: this.getEnvValue('INIT_SQL_STATIC_DB_ENCODING') },
                { key: 'INIT_SQL_STATIC_DB_TIMEZONE', value: this.getEnvValue('INIT_SQL_STATIC_DB_TIMEZONE') },
            )
        }
        
        if(this.config.hasStructureAccess){
            res.push(
                { key: 'INIT_USE_STRUCTURE_ACCESS', value: this.getEnvValue('INIT_USE_STRUCTURE_ACCESS') },
            )
        }
        
        if(this.config.hasAws){
            res.push(
                { key: 'INIT_AWS_S3_BUCKET', value: this.getEnvValue('INIT_AWS_S3_BUCKET') },
                { key: 'INIT_AWS_S3_REGION', value: this.getEnvValue('INIT_AWS_S3_REGION') },
                { key: 'INIT_AWS_S3_ACCESS_KEY', value: this.getEnvValue('INIT_AWS_S3_ACCESS_KEY') },
                { key: 'INIT_AWS_S3_SECRET_KEY', value: this.getEnvValue('INIT_AWS_S3_SECRET_KEY') },
                { key: 'INIT_HAS_AWS_S3_UPLOAD', value: this.getEnvValue('INIT_HAS_AWS_S3_UPLOAD') },
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

export type CreateAppConfig = {
    hasDynamicSql:boolean
    hasStaticSql:boolean
    hasMongo:boolean
    hasStaticRedis:boolean
    hasAws:boolean
    hasStructureAccess:boolean
    env:Record<string, string>
}
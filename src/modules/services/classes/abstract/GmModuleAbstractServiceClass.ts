import {GmAbstractModuleClass} from '@modules/abstractModule/GmAbstractModuleClass'
import {IGmModuleClass} from '@modules/interfaces/gmModule'
import {GmConfig} from 'os-core-ts'


export abstract class GmModuleAbstractServiceClass extends GmAbstractModuleClass implements IGmModuleClass {


    private className: string

    constructor(
        config: GmConfig,
        className: string,
    ) {
        super(config)
        this.className = className
    }

    public abstract init(): void

    public getPropertyName(): string {
        return this.className
    }

    public getDirName(): string {
        return 'services'
    }

    public getFileName(): string {
        return `${this.getPropertyName()}.ts`
    }
}
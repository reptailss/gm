import {
    EntityDec,
    EntityPrimaryKey,
    EntityDateAdd,
    EntityDateUpdate,
    EntityPrimaryKeyDec,
    EntityDateAddDec,
    EntityDateUpdateDec,
    EntityStringDec,
    EntityIntegerDec,
} from 'os-core-ts'

@EntityDec()
export class TestEntity {
    @EntityPrimaryKeyDec()
    public id!: EntityPrimaryKey

    @EntityDateAddDec()
    public date_add!: EntityDateAdd

    @EntityDateUpdateDec()
    public date_update!: EntityDateUpdate

    @EntityStringDec()
    public name!: string

    @EntityIntegerDec()
    public age!: number
}

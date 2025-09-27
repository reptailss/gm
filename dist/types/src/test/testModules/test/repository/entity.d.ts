import { EntityPrimaryKey, EntityDateAdd, EntityDateUpdate } from 'os-core-ts';
export declare class TestEntity {
    id: EntityPrimaryKey;
    date_add: EntityDateAdd;
    date_update: EntityDateUpdate;
    name: string;
    age: number;
}

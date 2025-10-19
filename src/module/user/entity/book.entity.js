import { EntitySchema } from 'typeorm';

export const bookEntity = new EntitySchema({
    name: 'Book',
    tableName: 'books',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
    },
        name: {
            type: 'varchar',
            nullable: true,
    },
        author: {
            type: 'varchar',
            default: 'sin autor conocido',
            nullable: true,
    },
        published: {
            type: 'datetime',
            nullable: true,
    },
},
});
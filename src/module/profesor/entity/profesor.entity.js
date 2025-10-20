import { EntitySchema } from "typeorm";

export const profesorEntity = new EntitySchema({
  name: "Profesor",
  tableName: "profesores",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    nombre: {
      type: "varchar",
      nullable: false,
    },
    apellido: {
      type: "varchar",
      nullable: false,
    },
    email: {
      type: "varchar",
      unique: true,
      nullable: false,
    },
    password: {
      type: "varchar",
      nullable: false,
    },
  },
  relations: {
    materias: {
      type: "one-to-many",
      target: "Materia",
      inverseSide: "profesor",
    },
  },
});

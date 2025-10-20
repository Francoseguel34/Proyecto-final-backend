import { EntitySchema } from "typeorm";

export const materiaEntity = new EntitySchema({
  name: "Materia",
  tableName: "materias",
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
    descripcion: {
      type: "text",
      nullable: true,
    },
  },
  relations: {
    profesor: {
      type: "many-to-one",
      target: "Profesor",
      joinColumn: { name: "profesor_id" },
      nullable: false,
    },
    alumnos: {
      type: "many-to-many",
      target: "Alumno",
      inverseSide: "materias",
    },
    tareas: {
      type: "one-to-many",
      target: "Tarea",
      inverseSide: "materia",
    },
  },
});

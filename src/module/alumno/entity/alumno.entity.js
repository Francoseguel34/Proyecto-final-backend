import { EntitySchema } from "typeorm";

export const alumnoEntity = new EntitySchema({
  name: "Alumno",
  tableName: "alumnos",
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
      type: "many-to-many",
      target: "Materia",
      joinTable: {
        name: "alumno_materia", // tabla intermedia
        joinColumn: { name: "alumno_id" },
        inverseJoinColumn: { name: "materia_id" },
      },
      cascade: true,
    },
    tareas: {
      type: "one-to-many",
      target: "Tarea",
      inverseSide: "alumno",
    },
  },
});

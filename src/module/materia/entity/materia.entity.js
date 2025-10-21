import { EntitySchema } from "typeorm";

export const Materia = new EntitySchema({
  name: "Materia",
  tableName: "materias",
  columns: {
    id: { type: Number, primary: true, generated: true },
    nombre: { type: String, nullable: false },
    descripcion: { type: String, nullable: true },
  },
  relations: {
    profesor: {
      target: "Profesor",
      type: "many-to-one",
      joinColumn: { name: "profesor_id" },
      onDelete: "SET NULL",
    },
    tareas: {
      target: "Tarea",
      type: "one-to-many",
      inverseSide: "materia",
    },
    alumnos: {
      target: "Alumno",
      type: "many-to-many",
      inverseSide: "materias",
      joinTable: { name: "alumno_materia" },
    },
  },
});

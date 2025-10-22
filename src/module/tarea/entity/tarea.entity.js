import { EntitySchema } from "typeorm";

export const Tarea = new EntitySchema({
  name: "Tarea",
  tableName: "tareas",
  columns: {
    id: { type: Number, primary: true, generated: true },
    titulo: { type: String, nullable: false },
    descripcion: { type: String, nullable: true },
    fechaEntrega: { type: "datetime", nullable: true },
    archivoUrl: { type: String, nullable: true },
    entregada: { type: Boolean, default: false },
  },
  relations: {
    materia: {
      target: "Materia",
      type: "many-to-one",
      joinColumn: { name: "materia_id" },
      onDelete: "CASCADE",
    },
    alumno: {
      target: "Alumno",
      type: "many-to-one",
      joinColumn: { name: "alumno_id" },
      onDelete: "CASCADE",
    },
  },
});

import { EntitySchema } from "typeorm";

export const tareaEntity = new EntitySchema({
  name: "Tarea",
  tableName: "tareas",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    titulo: {
      type: "varchar",
      nullable: false,
    },
    descripcion: {
      type: "text",
      nullable: true,
    },
    fechaEntrega: {
      type: "datetime",
      nullable: true,
    },
    archivoUrl: {
      type: "varchar",
      nullable: true,
    },
    entregada: {
      type: "boolean",
      default: false,
    },
  },
  relations: {
    materia: {
      type: "many-to-one",
      target: "Materia",
      joinColumn: { name: "materia_id" },
      nullable: false,
    },
    alumno: {
      type: "many-to-one",
      target: "Alumno",
      joinColumn: { name: "alumno_id" },
      nullable: true,
    },
  },
});

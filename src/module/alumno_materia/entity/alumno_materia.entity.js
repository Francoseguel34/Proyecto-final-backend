import { EntitySchema } from "typeorm";

export const AlumnoMateria = new EntitySchema({
  name: "AlumnoMateria",
  tableName: "alumno_materia",
  columns: {
    id: { type: Number, primary: true, generated: true },
  },
  relations: {
    alumno: {
      target: "Alumno",
      type: "many-to-one",
      eager: true,
      onDelete: "CASCADE",
    },
    materia: {
      target: "Materia",
      type: "many-to-one",
      eager: true,
      onDelete: "CASCADE",
    },
  },
});

import { EntitySchema } from "typeorm";

export const AlumnoMateria = new EntitySchema({
  name: "AlumnoMateria",
  tableName: "alumno_materia",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
  },
  relations: {
    alumno: {
      target: "Alumno",       // Debe coincidir con name de Alumno.entity.js
      type: "many-to-one",
      joinColumn: { name: "alumno_id" },
      eager: true,
      nullable: false,        // 👈 Importante: no permitir null
      onDelete: "CASCADE",
    },
    materia: {
      target: "Materia",      // Debe coincidir con name de Materia.entity.js
      type: "many-to-one",
      joinColumn: { name: "materia_id" },
      eager: true,
      nullable: false,        // 👈 Igual acá
      onDelete: "CASCADE",
    },
  },
});

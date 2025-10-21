import { EntitySchema } from "typeorm";

export const Profesor = new EntitySchema({
  name: "Profesor",
  tableName: "profesores",
  columns: {
    id: { type: Number, primary: true, generated: true },
    nombre: { type: String, nullable: false },
    apellido: { type: String, nullable: false },
    email: { type: String, unique: true, nullable: false },
    password: { type: String, nullable: false },
  },
  relations: {
    materias: {
      target: "Materia",
      type: "one-to-many",
      inverseSide: "profesor",
    },
  },
});

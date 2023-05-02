import knex from "knex";
import TodoRepo from "./todo";

const db = knex({
  client: "sqlite3",
  connection: "./db.sqlite",
  useNullAsDefault: true,
});

export default {
  db,
  todoRepo: new TodoRepo(db),
};

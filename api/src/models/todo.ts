import { BaseRepo } from "./base";
import { Knex } from "knex";
export interface Todo {
  id: number;
  name: string;
  completed: boolean;
  sort: number;
}

export default class TodoRepo extends BaseRepo<Todo> {
  constructor(db: Knex) {
    super(db, "tasks");
  }

  async create(name: string, completed: boolean, sort: number): Promise<Todo> {
    return await this.db(this.tableName).insert({ name, completed, sort });
  }

  async update(
    id: number,
    name: string,
    completed: boolean,
    sort: number
  ): Promise<Todo> {
    return await this.db(this.tableName)
      .where({ id })
      .update({ name, completed, sort });
  }
}

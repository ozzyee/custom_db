import { Table } from "./engine/func/table";
import { Query } from "./engine/func/query";

const table = new Table();
const query = new Query();

query.insert(
  "INSERT INTO todos (id, title, completed) VALUES (1, 'Buy groceries', false)"
);

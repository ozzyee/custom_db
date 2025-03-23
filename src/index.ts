import { query } from "./engine/func/query";
import { Table } from "./engine/func/table";

(async () => {
  query("INSERT INTO todos (title, completed) VALUES ('Buy groceries', false)");
})();

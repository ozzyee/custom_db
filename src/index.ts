import { Table } from "./engine/func/table";
import { Query } from "./engine/func/query";

(async () => {
  const table = new Table();
  const query = new Query();

  const result = await query.select("SELECT * FROM todos WHERE id = 1");
  console.log(result);
})();

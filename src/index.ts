import { Table } from "./engine/func/table";
import { Query } from "./engine/func/query";

(async () => {
  const table = new Table();
  const query = new Query();

  await query.delete(
    "DELETE FROM todos WHERE id = 10 and title conteins 'groceries'"
  );
})();

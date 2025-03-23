import { select } from "./select";
import { insert } from "./insert";
import { deleteQuery } from "./delete";

class Query {
  select = (sqlStatment: string) => select(sqlStatment);
  insert = (sqlStatment: string) => insert(sqlStatment);
  delete = (sqlStatment: string) => deleteQuery(sqlStatment);
}

export const query = (sqlStatment: string) => {
  const method = sqlStatment.split(" ")[0];

  // Valid methods
  const validMethods = ["SELECT", "INSERT", "DELETE"];

  if (!validMethods.includes(method)) {
    throw new Error("Invalid method!");
  }

  const query = new Query();
  query[method.toLowerCase() as keyof Query](sqlStatment);
};

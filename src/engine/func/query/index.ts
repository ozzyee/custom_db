import { select } from "./select";
import { insert } from "./insert";
import { deleteQuery } from "./delete";
export class Query {
  select = (sqlStatment: string) => select(sqlStatment);
  insert = (sqlStatment: string) => insert(sqlStatment);
  delete = (sqlStatment: string) => deleteQuery(sqlStatment);
}

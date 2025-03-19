import { getSchema, saveSchema } from "../../../storage/schema";
import { Column, ColumnType, TableSchema } from "./table";

export class Table {
  create(sqlStatment: string) {
    const regex = /create table (\w+) \((.*)\)/i;
    const match = sqlStatment.match(regex);

    if (!match) {
      throw new Error("Invalid SQL statement!");
    }

    const tableName = match[1];
    const columnsPart = match[2].split(",").map((column) => column.trim());

    const columns: Column[] = columnsPart.map((columnDefinition) => {
      const parts = columnDefinition.trim().split(" ");
      const columnName = parts[0];
      const columnType = parts[1];
      const isPrimaryKey = parts.includes("PRIMARY") && parts.includes("KEY");

      return {
        name: columnName,
        type: columnType as ColumnType,
        isPrimaryKey,
      };
    });

    const tableSchema: TableSchema = {
      name: tableName,
      columns,
    };

    saveSchema({
      tables: tableSchema,
    });
  }

  async get(tableName: string, version?: number) {
    return await getSchema({
      tableName,
      version,
    });
  }
}

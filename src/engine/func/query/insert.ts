import { convertTextToType } from "../../helper/convert-text-to-type";
import { getSchema } from "../../../storage/schema";
import { insertIntoTable } from "../../../storage/table";
import { Column } from "../table/table";

export const insert = async (sqlStatment: string) => {
  const match = sqlStatment.match(/INSERT INTO (\w+) \((.*)\) VALUES \((.*)\)/);

  if (!match) {
    throw new Error("Invalid SQL statement!");
  }

  const tableName = match[1];
  const columnsPart = match[2].split(",").map((column) => column.trim());
  const valuesPart = match[3].split(",").map((value) => value.trim());

  const tableSchema = await getSchema({
    tableName,
  });

  if (!tableSchema) {
    throw new Error("Table does not exist!");
  }

  // does the "columnsData" and the "schema" have the same columns if not throw an error
  const columns = tableSchema.columns.map((column: Column) => column.name);
  const columnsData = columnsPart
    .map((column, index) => {
      const columnIndex = columns.indexOf(column);

      if (columnIndex === -1) {
        throw new Error(`Column ${column} does not exist!`);
      }

      return {
        [column]: convertTextToType(
          valuesPart[index],
          tableSchema.columns[columnIndex].type
        ),
      };
    })
    .reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {});

  await insertIntoTable(tableName, columnsData);
};

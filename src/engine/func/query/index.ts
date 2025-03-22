import fs from "fs/promises";
import { getSchema } from "../../../storage/schema";
import { Column } from "../table/table";
import { convertTextToType } from "../../helper/convert-text-to-type";
import { getTableContent, insertIntoTable } from "../../../storage/table";

export class Query {
  async select(sqlStatment: string) {
    const match = sqlStatment.match(
      /SELECT (\*|\w+) FROM (\w+) (WHERE (\w+) = (\w+))?/
    );

    if (!match) {
      throw new Error("Invalid SQL statement!");
    }

    const tableName = match[2];
    const selectedColumns = match[1];
    const tableSchema = await getSchema({
      tableName,
    });

    if (!tableSchema) {
      throw new Error("Table does not exist!");
    }

    const whereClause = match[3] ? match[3] : null;
    const whereValue = match[4] ? match[4] : null;

    if (whereClause && whereValue) {
      const tableContent = await getTableContent(tableName);
      const filteredContent = tableContent.filter((row: any) => {
        return row[whereClause] === whereValue;
      });
      return filteredContent;
    }

    return await getTableContent(tableName);
  }

  async insert(sqlStatment: string) {
    const match = sqlStatment.match(
      /INSERT INTO (\w+) \((.*)\) VALUES \((.*)\)/
    );

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
  }
}

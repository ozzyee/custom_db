import { getSchema } from "../../../storage/schema";
import { getTableContent } from "../../../storage/table";

export const select = async (sqlStatment: string) => {
  // Updated regex to handle multiple conditions with AND and contains operator
  const match = sqlStatment.match(
    /SELECT (\*|\w+(?:\s*,\s*\w+)*) FROM (\w+)(?:\s+WHERE\s+(.+))?/i
  );

  if (!match) {
    throw new Error("Invalid SQL statement!");
  }

  const selectedColumns = match[1].split(/\s*,\s*/);
  const tableName = match[2];
  const whereClause = match[3];

  const tableSchema = await getSchema({
    tableName,
  });

  if (!tableSchema) {
    throw new Error("Table does not exist!");
  }

  const tableContent = await getTableContent(tableName);

  // Filter rows based on WHERE clause if it exists
  const filteredRows = !whereClause
    ? tableContent
    : tableContent.filter((row: any) => {
        // Parse WHERE conditions
        const conditions = whereClause.split(/\s+and\s+/i).map((condition) => {
          // Handle contains operator
          const containsMatch = condition.match(
            /(\w+)\s+contains\s+'([^']+)'/i
          );
          if (containsMatch) {
            return {
              column: containsMatch[1],
              operator: "contains",
              value: containsMatch[2],
            };
          }

          // Handle equals operator
          const equalsMatch = condition.match(/(\w+)\s*=\s*(\w+)/);
          if (equalsMatch) {
            return {
              column: equalsMatch[1],
              operator: "equals",
              value: equalsMatch[2],
            };
          }

          throw new Error(`Invalid condition: ${condition}`);
        });

        return conditions.every((condition) => {
          const rowValue = row[condition.column];

          if (condition.operator === "contains") {
            return String(rowValue)
              .toLowerCase()
              .includes(condition.value.toLowerCase());
          } else if (condition.operator === "equals") {
            // Try to convert to number if possible for comparison
            const conditionValue = !isNaN(condition.value as any)
              ? Number(condition.value)
              : condition.value;
            return rowValue === conditionValue;
          }

          return false;
        });
      });

  // If selecting all columns, return the filtered rows as is
  if (selectedColumns.length === 1 && selectedColumns[0] === "*") {
    return filteredRows;
  }

  // Otherwise, return only the selected columns
  return filteredRows.map((row: any) => {
    const selectedRow: any = {};
    selectedColumns.forEach((column) => {
      if (!(column in row)) {
        throw new Error(
          `Column '${column}' does not exist in table '${tableName}'`
        );
      }
      selectedRow[column] = row[column];
    });
    return selectedRow;
  });
};

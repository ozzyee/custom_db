import { deleteFromTable } from "../../../storage/table";

export const deleteQuery = async (sqlStatment: string) => {
  const match = sqlStatment.match(/DELETE FROM (\w+)(?:\s+WHERE\s+(.+))?/i);

  if (!match) {
    throw new Error("Invalid SQL statement!");
  }

  const tableName = match[1];
  const whereClause = match[2];

  console.log({
    tableName,
    whereClause,
  });

  await deleteFromTable(tableName, whereClause);
};

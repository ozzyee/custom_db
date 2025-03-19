export class Query {
  insert(sqlStatment: string) {
    const match = sqlStatment.match(
      /INSERT INTO (\w+) \((.*)\) VALUES \((.*)\)/
    );

    if (!match) {
      throw new Error("Invalid SQL statement!");
    }

    const tableName = match[1];
    const columnsPart = match[2].split(",").map((column) => column.trim());
    const valuesPart = match[3].split(",").map((value) => value.trim());
    const columns = columnsPart.map((column) => column.trim());
    const values = valuesPart.map((value) => value.trim());

    console.log({
      tableName,
      columns,
      values,
    });
  }
}

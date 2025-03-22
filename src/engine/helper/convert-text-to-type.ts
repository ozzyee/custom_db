import { ColumnType } from "../func/table/table";

export const convertTextToType = (value: string, type: ColumnType) => {
  switch (type) {
    case "INTEGER":
      return parseInt(value);
    case "TEXT":
      return value;
    case "BOOLEAN":
      return value === "true";
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
};

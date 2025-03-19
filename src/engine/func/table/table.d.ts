export type ColumnType = "INTEGER" | "TEXT" | "BOOLEAN";

export interface Column {
  name: string;
  type: ColumnType;
  isPrimaryKey?: boolean;

  // we can add more properties later like isUnique, isNotNull, isAutoIncrement, etc.
}

export interface TableSchema {
  name: string;
  columns: Column[];
}

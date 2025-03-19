# Relational Database Engine in TypeScript - 100 Days of Code

## **Day 1: Project Setup**

### Initialize the Project

```sh
mkdir my_db_project && cd my_db_project
npm init -y
npm install --save-dev typescript ts-node @types/node
npx tsc --init
```

### Create a Basic Structure

```
src/
├── index.ts
├── database.ts
├── storage.ts
```

### Setup Logging & Config

- Use `winston` or another logging library.
- Add a `.env` file for configurations (e.g., `DATABASE_PATH`).

---

## **Day 2: Implement Basic Data Storage**

### File-based Storage Layer

```ts
import { promises as fs } from "fs";

export async function writeToFile(path: string, data: any) {
  await fs.writeFile(path, JSON.stringify(data));
}

export async function readFromFile(path: string): Promise<any> {
  const content = await fs.readFile(path, "utf-8");
  return JSON.parse(content);
}
```

### Serialization Support

- Use `JSON.stringify()` for now, and later optimize with a binary format.

---

## **Day 3: Design the Database Interface**

### Core Functions

```ts
interface Schema {
  name: string;
  columns: Record<string, string>;
}

interface Row {
  [key: string]: any;
}

class Database {
  createTable(name: string, schema: Schema) {
    /*...*/
  }
  insertInto(table: string, data: Row) {
    /*...*/
  }
  selectFrom(table: string, condition: string) {
    /*...*/
  }
  update(table: string, condition: string, newValues: Row) {
    /*...*/
  }
  deleteFrom(table: string, condition: string) {
    /*...*/
  }
}
```

---

## **Day 4-5: Implement Table Creation & Inserts**

### Define `Schema` and Implement `createTable()`

### Validate Data Before Insert

### Enforce Constraints (e.g., `NOT NULL`, `UNIQUE`)

---

## **Day 6-7: Implement Querying, Updates, and Deletes**

### Basic `SELECT` Queries

### Support Simple Conditions (`WHERE column = value`)

### Implement `UPDATE` and `DELETE`

---

## **Day 8-9: Implement Joins & Indexing**

### `INNER JOIN` and `LEFT JOIN` Support

### Basic Indexing (e.g., B-Tree, Hashmap)

---

## **Day 10-15: Transactions, Foreign Keys, Optimization**

### Implement `BEGIN`, `COMMIT`, `ROLLBACK`

### Foreign Key Constraints (`ON DELETE CASCADE`)

### Query Execution Optimizations

---

## **Final Steps: API & Deployment**

### Expose a REST or GraphQL API

### Deploy on a Server (Docker, Vercel, etc.)

### Optimize and Scale (Sharding, Caching, etc.)

---

This plan ensures a structured, scalable approach to building a TypeScript-based database engine.

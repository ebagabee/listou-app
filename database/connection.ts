import * as SQLite from "expo-sqlite";

export const db = await SQLite.openDatabaseAsync("shoppingList.db");

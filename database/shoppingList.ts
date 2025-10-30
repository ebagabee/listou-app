import { db } from "./connection";

export async function addList(name: string) {
  return db.runAsync("INSERT INTO lists (name) VALUES (?)", [name]);
}

export async function addListItem(
  listId: number,
  name: string,
  quantity: number,
  price?: number
) {
  return db.runAsync(
    "INSERT INTO list_items (list_id, name, quantity, checked, price) VALUES (?, ?, ?, 0, ?)",
    [listId, name, quantity, price || null]
  );
}

export async function getLists() {
  return db.getAllAsync("SELECT * FROM lists");
}

export async function getItems(listId: number) {
  return db.getAllAsync("SELECT * FROM list_items WHERE list_id = ?", [listId]);
}

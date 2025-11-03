import { SQLiteDatabase } from "expo-sqlite";

export async function addList(db: any, name: string) {
  return db.runAsync("INSERT INTO lists (name) VALUES (?)", [name]);
}

export async function addListItem(
  db: any,
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

export async function getLists(db: any) {
  return db.getAllAsync("SELECT * FROM lists");
}

export async function getItems(db: any, listId: number) {
  const allRows = await db.getAllAsync(
    "SELECT id, name, quantity, price, checked, position FROM list_items WHERE list_id = ? ORDER BY checked ASC, position ASC",
    [listId]
  );

  return allRows.map((item: any) => ({
    ...item,
    is_checked: !!item.checked,
  }));
}

export async function updateItemChecked(db: any, itemId: number, isChecked: boolean) {
  const checkedValue = isChecked ? 1 : 0; 
  
  return db.runAsync(
    'UPDATE list_items SET checked = ? WHERE id = ?', 
    [checkedValue, itemId]
  );
}

export async function updateListName(db: any, listId: number, newName: string) {
  return db.runAsync(
    'UPDATE lists SET name = ? WHERE id = ?',
    [newName, listId]
  );
}
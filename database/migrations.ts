export async function createTables(db: any) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS lists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS list_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      list_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      checked BOOLEAN DEFAULT 0,
      price REAL,
      FOREIGN KEY (list_id) REFERENCES lists(id) -- Corrigi 'list(id)' para 'lists(id)'
    );
  `);
}

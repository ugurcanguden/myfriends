const TABLE_NAME = 'MyAnimals';

const MyAnimalsScripts = {
  createTable: `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
      id INTEGER NOT NULL, 
      name TEXT NOT NULL
    );`,
  updateItem: `UPDATE ${TABLE_NAME} SET name = ? WHERE id = ?;`,
  dropTable: `DROP TABLE ${TABLE_NAME};`,
  cleanTable: `DELETE FROM ${TABLE_NAME};`,
  insert: `INSERT INTO ${TABLE_NAME} (id, name) VALUES (?,?);`,
  getById: `SELECT * FROM ${TABLE_NAME} WHERE id = ?;`,
  get: `SELECT * FROM ${TABLE_NAME} ORDER BY id ASC;`,
  deleteById: `DELETE FROM ${TABLE_NAME} WHERE id = ?;`,
};

export {
    MyAnimalsScripts,
};
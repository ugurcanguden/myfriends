const TABLE_NAME = 'AnimalTypes';

const AnimalTypeScripts = {
  createTable: `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
      Id INTEGER NOT NULL, 
      Name TEXT NOT NULL,
      GestationDayDuration  INTEGER  NOT NULL,
      IsStatic INTEGER NULL
    );`, 
  updateItem: `UPDATE ${TABLE_NAME} SET Name = ?  ,GestationDayDuration = ?  WHERE Id = ?;`,
  insert: `INSERT INTO ${TABLE_NAME} (Id, Name,GestationDayDuration) VALUES (?,?,?);`,
  getMaxId: `SELECT MAX(id) AS MaxId FROM ${TABLE_NAME};`,
  getById: `SELECT * FROM ${TABLE_NAME} WHERE Id = ?;`,
  get: `SELECT * FROM ${TABLE_NAME} ORDER BY Id ASC;`,
  deleteById: `DELETE FROM ${TABLE_NAME} WHERE Id = ?;`,
};

export {
  AnimalTypeScripts,
};
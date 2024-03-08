import { ResultSet } from 'react-native-sqlite-storage';
import { DbNames } from '../../core/database/dbNames';
import sqliteService from '../../core/database/useDb';
import { AnimalTypeScripts } from './animalTypeScripts';

export const AnimalTypeService =()=>{ 

  const createTable=async ()=>{
    await sqliteService.open(DbNames.AnimalDB);
    await sqliteService.executeSql(DbNames.AnimalDB,AnimalTypeScripts.createTable); 
  }
  const updateItem=async (id: number, name: string, gestationDayDuration: number): Promise<void>=> {
    await createTable(); 
    return new Promise((resolve, reject) => {
      sqliteService.transaction(DbNames.AnimalDB, tx => {
        tx.executeSql(
          AnimalTypeScripts.updateItem,
          [name, gestationDayDuration, id],
          (_, result) => {
            resolve();
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  }

  const insert=async (id: number, name: string, gestationDayDuration: number): Promise<void>=> {
    await createTable();
    return new Promise((resolve, reject) => {
      sqliteService.transaction(DbNames.AnimalDB, tx => {
        tx.executeSql(
          AnimalTypeScripts.insert,
          [id, name, gestationDayDuration],
          (_, result) => {
            resolve();
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  }

  const getMaxId=async (): Promise<number>=> {
    await createTable(); 
    return new Promise((resolve, reject) => {
      sqliteService.transaction(DbNames.AnimalDB, tx => {
        tx.executeSql(AnimalTypeScripts.getMaxId, [], (_, result) => {
          const maxId = result.rows.item(0).MaxId || 0;
          resolve(maxId);
        }, (_, error) => {
          reject(error);
        });
      });
    });
  }

  const getById=async (id: number): Promise<ResultSet>=> {
    await createTable(); 
    return new Promise((resolve, reject) => {
      sqliteService.transaction(DbNames.AnimalDB, tx => {
        tx.executeSql(AnimalTypeScripts.getById, [id], (_, result) => {
          resolve(result);
        }, (_, error) => {
          reject(error);
        });
      });
    });
  }

  const get=async (): Promise<ResultSet>=> { 
    await createTable();
    return new Promise((resolve, reject) => {
      sqliteService.open(DbNames.AnimalDB);
      sqliteService.executeSql(DbNames.AnimalDB,AnimalTypeScripts.createTable);
      sqliteService.transaction(DbNames.AnimalDB, tx => {
        tx.executeSql(AnimalTypeScripts.get, [], (_, result) => {
          resolve(result);
        }, (_, error) => {
          reject(error);
        });
      });
    });
  }

  const deleteById=async (id: number): Promise<void>=> {
    await createTable();
    return new Promise((resolve, reject) => {
      sqliteService.transaction(DbNames.AnimalDB, tx => {
        tx.executeSql(AnimalTypeScripts.deleteById, [id], (_, result) => {
          resolve();
        }, (_, error) => {
          reject(error);
        });
      });
    });
  }
  return {
    get,
    insert,
    getMaxId,
    updateItem,
    deleteById
  }
}




import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, DataTable } from 'react-native-paper';
import { AnimalTypeModel } from '../../models/animalTypes/animalTypeModel';
import { AnimalTypeService } from '../../services/animalTypes/animalTypeService';
import { AnimalTypeInsertUpdate } from './animalTypeAdd';

export const AnimalTypeListScreen = () => {
  const [animalTypes, setAnimalTypes] = useState<AnimalTypeModel[]>([]);
  const [maxId, setMaxId] = useState(0);
  const { get, deleteById, getMaxId } = AnimalTypeService();
  const fetchData = async () => {

    getMaxId().then(id => {
      setMaxId(id);
    }).catch(error => {
      console.error('Error getting max ID:', error);
    }); 
    get().then((result) => {
      let animalType: AnimalTypeModel[] = [];
      for (let i = 0; i < result.rows.length; i++) {
        const row = result.rows.item(i);
        animalType.push(row);
      }
      setAnimalTypes(animalType);
    });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
  })

  const deleteAnimalType = async (id: number) => {
    try {
      await deleteById(id);
      fetchData();
    } catch (error) {
      console.error('Error deleting animal type:', error);
    }
  }

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [animalTypeInsertUpdateProps, setAnimalTypeInsertUpdateProps] = useState<any>(
    {
      setIsModalVisible: (isVisible: boolean) => {
        setAnimalTypeInsertUpdateProps({
          ...animalTypeInsertUpdateProps,
          animalTypeModel: { Id: 0, Name: "", IsStatic: false, GestationDayDuration: 0 }
        })
        setIsModalVisible(isVisible);
      },
      maxId: maxId,
      animalTypeModel: { Id: 0, GestationDayDuration: 0, Name: "", IsStatic: false }
    });

  useEffect(() => {
    fetchData();
  }, [isModalVisible])
  return (
    <ScrollView  >
      <DataTable>
        <DataTable.Header > 
          <DataTable.Title >Cinsi</DataTable.Title>
          <DataTable.Title numeric>Gebelik Süresi(Gün)</DataTable.Title>
          <DataTable.Title numeric> - </DataTable.Title>
          <DataTable.Title numeric>- </DataTable.Title>
        </DataTable.Header>
        {animalTypes.map((item, index) => (
          <DataTable.Row key={index}> 
            <DataTable.Cell>{item.Name}</DataTable.Cell>
            <DataTable.Cell numeric>{item.GestationDayDuration}</DataTable.Cell>
            <DataTable.Cell >
              <Button onPress={() => {
                setIsModalVisible(true);
                setAnimalTypeInsertUpdateProps({
                  ...animalTypeInsertUpdateProps,
                  animalTypeModel: { Id: item.Id, Name: item.Name, IsStatic: item.IsStatic, GestationDayDuration: item.GestationDayDuration }
                });
              }}>  
                Güncelle
              </Button></DataTable.Cell>
            <DataTable.Cell numeric>
              <Button onPress={() => deleteAnimalType(item.Id)}>Sil</Button>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      <AnimalTypeInsertUpdate isModalVisible={isModalVisible} {...animalTypeInsertUpdateProps}></AnimalTypeInsertUpdate>
    </ScrollView>
  );
};


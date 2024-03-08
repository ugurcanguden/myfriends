import React, { useEffect, useRef, useState } from 'react'
import { Modal, View } from 'react-native'
import { Button, Card, Text, TextInput } from 'react-native-paper';
import { AnimalTypeModel } from '../../models/animalTypes/animalTypeModel';
import { AnimalTypeService } from '../../services/animalTypes/animalTypeService';

export interface AnimalTypeInsertUpdateProps {
    isModalVisible: boolean;
    setIsModalVisible: (isVisible: boolean) => void;
    animalTypeModel?: AnimalTypeModel;
    maxId: number
}
export const AnimalTypeInsertUpdate = (props: AnimalTypeInsertUpdateProps) => {
    const { isModalVisible, setIsModalVisible, animalTypeModel, maxId } = props;
    const { insert, updateItem } = AnimalTypeService();
    const prevAnimalTypeModel = useRef({ animalTypeModel });
    useEffect(() => {
        if (prevAnimalTypeModel.current.animalTypeModel?.Id != animalTypeModel?.Id && animalTypeModel?.Id != null) {
            setNewAnimalType({
                Id: animalTypeModel.Id,
                GestationDayDuration: animalTypeModel?.GestationDayDuration,
                IsStatic: false,
                Name: animalTypeModel.Name
            })
        }

    }, [animalTypeModel?.Id])
    const [newAnimalType, setNewAnimalType] = useState<AnimalTypeModel>({ Id: 0, Name: '', GestationDayDuration: 0, IsStatic: false });

    const addNewAnimalType = async () => {
        try {
            const newId = maxId + 1;
            await insert(newId, newAnimalType.Name, newAnimalType.GestationDayDuration);
            setIsModalVisible(false);
        } catch (error) {
            console.error('Error adding new animal type:', error);
        }
    }

    const updateAnimalType = async () => {
        try {
            await updateItem(newAnimalType.Id, newAnimalType.Name, newAnimalType.GestationDayDuration);
            setIsModalVisible(false);
        } catch (error) {
            console.error('Error updating animal type:', error);
        }
    }
    return (
        <Modal visible={isModalVisible} animationType="slide">
            <View>
                <Card>
                    <Card.Content>
                        <Text>Cinsi:</Text>
                        <TextInput
                            value={newAnimalType.Name}
                            onChangeText={(text) => setNewAnimalType({ ...newAnimalType, Name: text })}
                        />
                        <Text>Gebelik Süresi:</Text>
                        <TextInput
                            value={newAnimalType.GestationDayDuration.toString()}
                            onChangeText={(text) => setNewAnimalType({ ...newAnimalType, GestationDayDuration: Number(text) })}
                            keyboardType="numeric"
                        />
                       
                    </Card.Content>
                    <Card.Actions>
                         <Button onPress={newAnimalType.Id === 0 ? addNewAnimalType : updateAnimalType}>Kaydet</Button>
                        <Button onPress={() => setIsModalVisible(false)}>İptal</Button>
                    </Card.Actions>
                </Card>
            </View>
        </Modal>
    )
}

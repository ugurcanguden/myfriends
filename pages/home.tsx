// HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AnimalForm from '../libs/sections/myAnimal/animalForm';
import { Modal, Button, PaperProvider, Card } from 'react-native-paper';
import sqliteService from '../libs/core/database/useDb';
import { MyAnimalsScripts } from '../libs/services/animal/animalScripts';
import AnimalList from '../libs/sections/myAnimal/animalList';

const HomeScreen = (props: any) => {
    useEffect(() => {
        setVisible(false)
    }, [])
    const { navigation } = props;
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'none' };
    const [animals, setAnimals] = useState<any[]>([]);

    useEffect(() => { console.log(JSON.stringify("Test")); getDatas() }, [])
    useEffect(() => { getDatas() }, [visible])


    const getDatas = () => {
        sqliteService.open("Test");
        sqliteService.executeSql("Test", MyAnimalsScripts.get).then((result) => {
            let item: any[] = [];
            console.log(JSON.stringify(result));
            for (let i = 0; i < result[0].rows.length; i++) {
                const row = result[0].rows.item(i);
                item.push(row);
                console.log(JSON.stringify(row));
            }
            setAnimals(item);
        }).catch(() => {
            console.log("JSON.stringify")
        })
    }

    return (
        <PaperProvider>
            <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={containerStyle}
            >
                <AnimalForm />
            </Modal>
            <Button style={{ marginTop: 30 }} onPress={showModal}>
                Show
            </Button>

            {/* {animals.map(animal =>
                <Card>
                    <Card.Content>
                        {animal["Name"]}
                    </Card.Content>
                </Card>)
            } */}
            <AnimalList/>


        </PaperProvider>
    );
};

export default HomeScreen;

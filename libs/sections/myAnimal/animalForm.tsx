import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Card, HelperText, TextInput } from 'react-native-paper';
import sqliteService from '../../core/database/useDb';
import { MyAnimalsScripts } from '../../services/animal/animalScripts';
import { DbNames } from '../../core/database/dbNames';


const AnimalForm = () => {
    const [name, setName] = useState('');

    const handleSubmit = async () => {
        if (name == null || name == undefined || name == '') {
            return;
        }
        sqliteService.open(DbNames.AnimalDB);
        sqliteService.executeSql(DbNames.AnimalDB, MyAnimalsScripts.createTable);
        sqliteService.executeSql(DbNames.AnimalDB, MyAnimalsScripts.get).then((result) => {
            // console.log(JSON.stringify(result));
            console.log(JSON.stringify(result[0].rows));
            for (let i = 0; i < result[0].rows.length; i++) {
                const row = result[0].rows.item(i);
                console.log('Row:', row);
            }
            // const [{ rows }] = result;
            let newId: number = result[0].rows.length + 1;
            sqliteService.executeSql("Test", MyAnimalsScripts.insert, [newId, name]);

        });

    };
    return (
        <View>
            <Card>
                <Card.Content>
                    <TextInput
                        label={
                            <Text>
                                Hayvan Adı
                                <Text style={{ color: 'red' }}> *</Text>
                            </Text>
                        }
                        value={name}
                        onChangeText={(text) => setName(text)}

                    />
                    <HelperText type="error" visible={!(name != undefined && name?.length > 0)}>
                        required
                    </HelperText>
                    <TextInput
                        label={
                            <Text>
                                Hayvan Adı
                                <Text style={{ color: 'red' }}> *</Text>
                            </Text>
                        }
                        value={name}
                        onChangeText={(text) => setName(text)}

                    />
                    <HelperText type="error" visible={!(name != undefined && name?.length > 0)}>
                        required
                    </HelperText>
                    <TextInput
                        label={
                            <Text>
                                Hayvan Adı
                                <Text style={{ color: 'red' }}> *</Text>
                            </Text>
                        }
                        value={name}
                        onChangeText={(text) => setName(text)}

                    />
                    <HelperText type="error" visible={!(name != undefined && name?.length > 0)}>
                        required
                    </HelperText>
                    <TextInput
                        label={
                            <Text>
                                Hayvan Adı
                                <Text style={{ color: 'red' }}> *</Text>
                            </Text>
                        }
                        value={name}
                        onChangeText={(text) => setName(text)}

                    />
                    <HelperText type="error" visible={!(name != undefined && name?.length > 0)}>
                        required
                    </HelperText>
                    <TextInput
                        label={
                            <Text>
                                Hayvan Adı
                                <Text style={{ color: 'red' }}> *</Text>
                            </Text>
                        }
                        value={name}
                        onChangeText={(text) => setName(text)}

                    />
                    <HelperText type="error" visible={!(name != undefined && name?.length > 0)}>
                        required
                    </HelperText>
                </Card.Content>
                <Card.Actions>
                    <Button mode="contained" onTouchEnd={() => handleSubmit()}>
                        Kaydet
                    </Button>
                </Card.Actions>
            </Card> 
        </View>


    );
};

export default AnimalForm;
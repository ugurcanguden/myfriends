// SettingsScreen.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';

const SettingsScreen = (props: any) => {
    const { navigation } = props;
    return (
        <View>
            <Text>Settings Screen</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
};

export default SettingsScreen;

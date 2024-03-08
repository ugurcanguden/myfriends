import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './pages/home';
import SettingsScreen from './pages/settingsScreen';
import AnimalTypes from './pages/animalTypes';
 
// Diğer import'leri ekleyin

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function App(): React.JSX.Element { 
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName={"AnimalTypes"}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="AnimalTypes" component={AnimalTypes} /> 
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
export default App;

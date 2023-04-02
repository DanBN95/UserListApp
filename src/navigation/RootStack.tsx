import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import UserScreen from '../screens/UserScreen';

const Stack = createNativeStackNavigator();

const RootStack = () => {

    const screens = [
        {
            name: "HomeScreen",
            component: HomeScreen
        },
        {
            name: "UserScreen",
            component: UserScreen
        },
    ];

  return (
    <Stack.Navigator
        initialRouteName='HomeScreen'
        screenOptions={{ headerShown: false }}
    >
        {/* <Stack.Screen name='HomeScreen' component={HomeScreen} /> */}
        {screens.map((screen, index) => {
            const { name, component } = screen;
            return (
                <Stack.Screen {...{ name, component, key: index }} />
            )
        })}
    </Stack.Navigator>
  )
}

export default RootStack;
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { StopwatchScreen } from './screens/StopwatchScreen';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { MainStack } from './navigations/MainStack';
import { TimerScreen } from './screens/TimerScreen';
import { useEffect, useState } from 'react';
import { initDB } from './database/localdb';

export default function App() {

  const [dbInitialized, setDbInitialized] = useState(false);

  const BottomTab = createBottomTabNavigator();

  

  useEffect( () => {
    initDB()
      .then(res => {
      console.log(res);
      setDbInitialized(true);

      })
      .catch(err => console.log(err))

  },[]);

  return (
    <NavigationContainer>
      <BottomTab.Navigator screenOptions={ {headerShown: false, tabBarShowLabel: false }}>
        <BottomTab.Screen 
        options={{tabBarIcon: () => <FontAwesome5 name="stopwatch" size={24} color="black" />}}
        name="MainStack"
        component={MainStack}
        initialParams={{dbInitialized: dbInitialized}}
        />
        <BottomTab.Screen 
        options={{tabBarIcon: () => {return <FontAwesome5 name="stopwatch-20" size={24} color="black" />}}}
        name="TimerScreen"
        component={TimerScreen}
        />

      </BottomTab.Navigator>
    </NavigationContainer>

  );
}


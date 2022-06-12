import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { StopwatchScreen } from './screens/StopwatchScreen';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { MainStack } from './navigations/MainStack';
import { TimerScreen } from './screens/TimerScreen';

export default function App() {

  const BottomTab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <BottomTab.Navigator screenOptions={ {headerShown: false, tabBarShowLabel: false }}>
        <BottomTab.Screen 
        options={{tabBarIcon: () => <FontAwesome5 name="stopwatch" size={24} color="black" />}}
        name="MainStack"
        component={MainStack}
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


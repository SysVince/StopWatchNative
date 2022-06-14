import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StopwatchScreen } from "../screens/StopwatchScreen";
import { TimerScreen } from "../screens/TimerScreen";

export const MainStack = () => {

    const StackNavigation = createNativeStackNavigator();

    // <StackNavigation.Screen
    // name="TimerScreen"
    // component={TimerScreen} />

    // Har inga Stacknivåer än
return(

    <StackNavigation.Navigator>
        <StackNavigation.Screen 
        options={{ headerShown:false }}
        name="StopwatchScreen"
        component={StopwatchScreen} />


    </StackNavigation.Navigator>
)


}
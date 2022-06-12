import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StopwatchScreen } from "../screens/StopwatchScreen";
import { TimerScreen } from "../screens/TimerScreen";

export const MainStack = () => {

    const StackNavigation = createNativeStackNavigator();

    // <StackNavigation.Screen
    // name="TimerScreen"
    // component={TimerScreen} />
return(

    <StackNavigation.Navigator>
        <StackNavigation.Screen 
        name="StopwatchScreen"
        component={StopwatchScreen} />


    </StackNavigation.Navigator>
)


}
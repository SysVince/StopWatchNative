import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StopwatchScreen } from "../screens/StopwatchScreen";

export const MainStack = ({ dbInitialized }) => {
  const StackNavigation = createNativeStackNavigator();

  // Finns inga Stacknivåer i dagsläget
  return (
    <StackNavigation.Navigator>
      <StackNavigation.Screen
        options={{ headerShown: false }}
        name="StopwatchScreen"
        component={StopwatchScreen}
        initialParams={{ dbInitialized: dbInitialized }}
      />
    </StackNavigation.Navigator>
  );
};

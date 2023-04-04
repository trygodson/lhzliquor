import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ForgetPasswordScreen, LoginScreen, RegisterScreen} from "../screens";

const Stack = createNativeStackNavigator();
const AuthenticationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="LoginScreen"
    >
      <Stack.Screen component={LoginScreen} name="LoginScreen" options={{headerShown: false, gestureEnabled: false}} />
      <Stack.Screen
        component={RegisterScreen}
        name="RegisterScreen"
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        component={ForgetPasswordScreen}
        name="ForgetPasswordScreen"
        options={{headerShown: false, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};

export {AuthenticationStack};

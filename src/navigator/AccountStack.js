import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {
  AccountScreen,
  CartScreen,
  CheckOutScreen,
  HomeScreen,
  ItemDetails,
  OrderScreen,
  SuccessScreen,
  OrderDetails,
} from "../screens";

const Stack = createNativeStackNavigator();
const AccountStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="HomeScreen"
    >
      <Stack.Screen component={AccountScreen} name="HomeScreen" options={{headerShown: false, gestureEnabled: false}} />
      <Stack.Screen
        component={OrderScreen}
        name="OrderScreen"
        options={{
          headerShown: false,
          gestureEnabled: false,
          gestureEnabled: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        component={OrderDetails}
        name="OrderDetails"
        options={{
          headerShown: false,
          gestureEnabled: false,
          gestureEnabled: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;

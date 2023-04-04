import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {CartScreen, CheckOutScreen, ItemDetails, SuccessScreen} from "../screens";
import {SearchScreen, ShopScreen} from "../screens";

const Stack = createNativeStackNavigator();
const ShopStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="HomeScreen"
    >
      <Stack.Screen component={ShopScreen} name="HomeScreen" options={{headerShown: false, gestureEnabled: false}} />
      <Stack.Screen
        component={SearchScreen}
        name="SearchScreen"
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen component={ItemDetails} name="ItemDetails" options={{headerShown: false, gestureEnabled: false}} />
      <Stack.Screen
        component={CartScreen}
        name="CartScreen"
        options={{
          headerShown: false,
          gestureEnabled: false,
          gestureEnabled: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        component={CheckOutScreen}
        name="CheckOutScreen"
        options={{
          headerShown: false,
          gestureEnabled: false,
          gestureEnabled: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        component={SuccessScreen}
        name="SuccessScreen"
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

export default ShopStack;

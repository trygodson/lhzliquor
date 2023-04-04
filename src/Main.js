import {createNavigationContainerRef, NavigationContainer} from "@react-navigation/native";
// import {StripeProvider} from "@stripe/stripe-react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import MainStack from "./navigator/mainStack";

export const navigationRef = createNavigationContainerRef();

const MainApp = () => {
  return (
    // <StripeProvider
    //   publishableKey="pk_test_51IcuBkBS4zSmiRnKgBs9Yu8IN4Nh44sXSaFenODi3AR9WE4daFrjEyz33Qq1BdJcDIXilvyccSwyfpcVu3fR8VI1001ppAP5SO"
    //   // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    //   merchantIdentifier="merchant.com.{{lhzliquor}}" // required for Apple Pay
    // >
    <NavigationContainer ref={navigationRef}>
      <SafeAreaProvider>
        <MainStack />
      </SafeAreaProvider>
    </NavigationContainer>
    // </StripeProvider>
  );
};

export default MainApp;

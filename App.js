/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import {useColorScheme} from "react-native";
import {Provider} from "react-redux";
import MainApp from "./src/Main";
import {store} from "./src/store";
import {StripeProvider} from "@stripe/stripe-react-native";

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App = () => {
  // const isDarkMode = useColorScheme() === "dark";

  return (
    <Provider store={store}>
      <StripeProvider
        // publishableKey="pk_test_51MWECsE1PkcgbMSB4Kmxp3qfL9ytXFmBwdjzpCzeRK1qAu8S6DQqYdfdlZtoVppjvb9gH3TscCrrX0mZPTC2Byg8008E23ayNh"
        publishableKey="pk_live_51MawH7JGGwwt1Z34MU2mnYogzrvzvQry5UZz2el8s5e1a1V3S5C7CWvMzouhp9H1w6JCKRONc6ZgSxDakCG85f1W00rmjHthaf"
        // urlScheme="stripe-example" // required for 3D Secure and bank redirects
        merchantIdentifier="com.lhzliquor" // required for Apple Pay
      >
        <MainApp />
      </StripeProvider>
    </Provider>
  );
};

export default App;

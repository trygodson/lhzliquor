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

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App = () => {
  // const isDarkMode = useColorScheme() === "dark";

  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;

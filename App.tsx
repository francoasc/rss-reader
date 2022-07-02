import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import AppStack from "./src/routeComponentMap";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

import React from "react";
import { ActivityIndicator, View } from "react-native";
import styles from "./LoadingSpinner.styles";

const LoadingSpinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingSpinner;

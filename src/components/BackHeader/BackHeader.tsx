import { View, Text } from "react-native";
import React from "react";
import styles from "./BackHeader.styles";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  onPressBack: () => void;
}

const BackHeader: React.FC<Props> = ({ onPressBack }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressBack}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default BackHeader;

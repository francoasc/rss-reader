import React from "react";
import { Modal, TouchableOpacity, View, Text } from "react-native";
import styles from "./TopNavigationBar.styles";
import { Entypo } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  sortRssList,
  RssOrder,
  filterByTitle,
} from "../../redux/reducers/rssSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

interface Props {
  setShowAddNewFeed: (addNewBoolean: boolean) => void;
  showAddNewFeed: boolean;
}

const TopBar: React.FC<Props> = ({ setShowAddNewFeed, showAddNewFeed }) => {
  const dispatch = useAppDispatch();
  const { order } = useAppSelector(({ rss }) => rss);

  const handleReOrderArticles = () => {
    dispatch(sortRssList(order));
  };

  const handleAddNewFeed = () => {
    setShowAddNewFeed(!showAddNewFeed);
  };

  const handleSearchOnChange = (text: string) => {
    dispatch(filterByTitle(text));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleReOrderArticles}>
        <MaterialCommunityIcons
          name={`sort-calendar-${
            order === RssOrder.ASCENDING ? "ascending" : "descending"
          }`}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <TextInput
        placeholder="Busca por título"
        onChangeText={handleSearchOnChange}
        style={styles.textInput}
      />
      <TouchableOpacity onPress={handleAddNewFeed}>
        <Entypo name="add-to-list" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;

import React from "react";
import { TouchableOpacity, View } from "react-native";
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

const TopBar = () => {
  const dispatch = useAppDispatch();
  const { order } = useAppSelector(({ rss }) => rss);

  const handleReOrderArticles = () => {
    dispatch(sortRssList(order));
  };

  const handleAddNewFeed = () => {};

  const handleSearchOnChange = (text: string) => {
    dispatch(filterByTitle(text));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleReOrderArticles}>
        {order === RssOrder.ASCENDING ? (
          <MaterialCommunityIcons
            name="sort-calendar-ascending"
            size={24}
            color="black"
          />
        ) : (
          <MaterialCommunityIcons
            name="sort-calendar-descending"
            size={24}
            color="black"
          />
        )}
      </TouchableOpacity>
      <TextInput
        placeholder="Busca por título"
        onChangeText={handleSearchOnChange}
        style={styles.textInput}
      />

      <TouchableOpacity>
        <Entypo name="add-to-list" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;

import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./TopNavigationBar.styles";
import { Entypo } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { sortRssList, RssOrder } from "../../redux/reducers/rssSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TopBar = () => {
  const { order } = useAppSelector(({ rss }) => rss);
  const dispatch = useAppDispatch();

  const handleReOrderArticles = () => {
    dispatch(sortRssList(order));
  };
  const handleAddNewFeed = () => {};

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
      <Text>Home</Text>
      <TouchableOpacity>
        <Entypo name="add-to-list" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;

import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { RssResponse } from "../../redux/reducers/rssSlice";
import styles from "./ArticleCard.styles";
import RouteNames from "../../routeNames";
import { NavigationProp } from "@react-navigation/native";

interface Props extends RssResponse {
  navigation: NavigationProp<any>;
}

const ArticleCard: React.FC<Props> = ({
  description,
  title,
  image,
  stringifiedDate,
  url,
  navigation,
}) => {
  const handleCardPress = () => {
    navigation.navigate(RouteNames.Rss.ArticleDetail, {
      title,
      description,
      image,
      url,
    });
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={handleCardPress}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{stringifiedDate}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.descriptionContainer}>
            <Text>{description.substring(0, 100)} ...</Text>
          </View>
          <Image
            style={styles.image}
            source={{
              uri: image,
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ArticleCard;

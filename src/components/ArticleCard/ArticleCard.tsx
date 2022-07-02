import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { RssResponse } from "../../redux/reducers/rssSlice";
import styles from "./ArticleCard.styles";

const ArticleCard: React.FC<RssResponse> = ({
  description,
  title,
  image,
  stringifiedDate,
  date,
}) => {
  const handleCardPress = () => {
    console.log("Card pressed");
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
// { flexShrink: 1, flex: 1 }
export default ArticleCard;

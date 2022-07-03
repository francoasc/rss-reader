import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { Image, Linking, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BackHeader from "../../components/BackHeader";
import styles from "./ArticleDetail.styles";

interface Props {
  navigation: NavigationProp<any>;
  route: {
    params: {
      title: string;
      description: string;
      image: string;
      url: string;
      route: string;
    };
  };
}

const ArticleDetail: React.FC<Props> = ({ route, navigation }) => {
  const { title, description, image, url } = route.params;

  const handleOnPress = () => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.mainContainer}>
      <BackHeader onPressBack={navigation.goBack} />
      <Text style={styles.title}>{title}</Text>
      <ScrollView style={styles.innerContainer}>
        <View style={styles.descriptionContainer}>
          <Text>{description}</Text>
        </View>
        <Image
          style={styles.image}
          source={{
            uri: image,
          }}
        />
      </ScrollView>
      <Pressable style={styles.button} onPress={handleOnPress}>
        <Text style={styles.text}>Ver en el navegador</Text>
      </Pressable>
    </View>
  );
};

export default ArticleDetail;

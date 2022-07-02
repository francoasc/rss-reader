import { NavigationProp } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, View, FlatList } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ArticleCard from "../../components/ArticleCard";
import TopNavigationBar from "../../components/TopNavigationBar";
import { fetchRssXML } from "../../redux/reducers/rssSlice";
import styles from "./Home.styles";

interface Props {
  navigation: NavigationProp<any>;
}

const Home: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { rssListCopy, rssList } = useAppSelector((state) => state.rss);

  useEffect(() => {
    dispatch(fetchRssXML("http://www.xatakandroid.com/tag/feeds/rss2.xml"));
    // dispatch(fetchRssXML("http://www.reddit.com/r/Bitcoin/.rss"));
  }, []);

  return (
    <View style={styles.container}>
      <TopNavigationBar />
      {rssListCopy.length ? (
        <FlatList
          data={rssListCopy}
          renderItem={({ item }) => (
            <ArticleCard {...item} navigation={navigation} />
          )}
          keyExtractor={({ id }) => id}
        />
      ) : rssList.length ? ( // If rssList has length means that there's data but the filter didn't find it
        <View style={styles.noDataContainer}>
          <Text>No se encontraron feeds con ese título</Text>
        </View>
      ) : (
        <View style={styles.noDataContainer}>
          <Text>No hay feeds agregados!</Text>
        </View>
      )}
    </View>
  );
};

export default Home;

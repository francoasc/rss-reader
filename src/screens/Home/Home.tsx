import React, { useEffect } from "react";
import { Text, View, FlatList } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ArticleCard from "../../components/ArticleCard";
import { fetchRssXML } from "../../redux/reducers/rssSlice";
import styles from "./Home.styles";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const rss = useAppSelector((state) => state.rss);

  useEffect(() => {
    // dispatch(fetchRssXML("http://www.xatakandroid.com/tag/feeds/rss2.xml"));
    dispatch(fetchRssXML("http://www.reddit.com/r/Bitcoin/.rss"));
  }, []);

  return (
    <View style={styles.container}>
      {rss.rssList.length ? (
        <FlatList
          data={rss.rssList}
          renderItem={({ item }) => <ArticleCard {...item} />}
          keyExtractor={({ id }) => id}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <Text>No rss feed added</Text>
        </View>
      )}
    </View>
  );
};

export default Home;

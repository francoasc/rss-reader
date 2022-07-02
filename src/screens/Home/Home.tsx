import { NavigationProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AddFeedModal from "../../components/AddFeedModal/AddFeedModal";
import ArticleCard from "../../components/ArticleCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import TopNavigationBar from "../../components/TopNavigationBar";
import { fetchRssXML } from "../../redux/reducers/rssSlice";
import styles from "./Home.styles";

interface Props {
  navigation: NavigationProp<any>;
}

const Home: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { rssListCopy, rssList, rssListURLs } = useAppSelector(
    (state) => state.rss
  );
  const [showAddNewFeed, setShowAddNewFeed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If there are feed urls then we fetch them
    if (rssListURLs?.length) {
      rssListURLs.forEach((url) => {
        dispatch(fetchRssXML(url));
      });
    }
  }, [rssListURLs]);

  useEffect(() => {
    if (!rssListURLs?.length) setIsLoading(false);

    if (rssListCopy?.length || rssList?.length) setIsLoading(false);
  }, [rssList]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <View style={styles.container}>
      <TopNavigationBar
        setShowAddNewFeed={setShowAddNewFeed}
        showAddNewFeed={showAddNewFeed}
      />
      {rssListCopy.length ? (
        <FlatList
          data={rssListCopy}
          renderItem={({ item }) => (
            <ArticleCard {...item} navigation={navigation} />
          )}
          keyExtractor={({ id }) => id}
        />
      ) : rssList.length ? ( // If rssList has length and rssListCopy doesn't means that there's data but the filter didn't find it
        <View style={styles.noDataContainer}>
          <Text>No se encontraron feeds con ese título</Text>
        </View>
      ) : (
        <View style={styles.noDataContainer}>
          <Text>No hay feeds agregados!</Text>
        </View>
      )}
      <AddFeedModal
        showAddNewFeed={showAddNewFeed}
        setShowAddNewFeed={setShowAddNewFeed}
      />
    </View>
  );
};

export default Home;

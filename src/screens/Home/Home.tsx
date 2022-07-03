import { NavigationProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AddFeedModal from "../../components/AddFeedModal/AddFeedModal";
import ArticleCard from "../../components/ArticleCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import TopNavigationBar from "../../components/TopNavigationBar";
import {
  changeIsAsyncStorageLoading,
  fetchRssXML,
  loadDataFromAsyncStorage,
} from "../../redux/reducers/rssSlice";

import styles from "./Home.styles";

interface Props {
  navigation: NavigationProp<any>;
}

const Home: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const { rssListCopy, rssList, rssListURLs, isAsyncStorageLoading } =
    useAppSelector((state) => state.rss);
  const [showAddNewFeed, setShowAddNewFeed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If there aren't rss URLs added then we cancel the loading (so the user can add new rss URLs)
    if (!rssListURLs?.length) setIsLoading(false);

    // If there are feed urls then we fetch the data from them
    if (rssListURLs?.length) {
      rssListURLs.forEach((url) => {
        dispatch(fetchRssXML(url));
      });
    }
  }, [rssListURLs]);

  useEffect(() => {
    // if rssLists don't have data then we show "No data" on the screen
    if (rssListCopy?.length || rssList?.length) setIsLoading(false);
  }, [rssList]);

  useEffect(() => {
    // Loading data from AsyncStorage
    dispatch(loadDataFromAsyncStorage());
  }, []);

  useEffect(() => {
    if (isAsyncStorageLoading) dispatch(changeIsAsyncStorageLoading(false));
  }, [isAsyncStorageLoading]);

  if (isLoading || isAsyncStorageLoading) return <LoadingSpinner />;

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

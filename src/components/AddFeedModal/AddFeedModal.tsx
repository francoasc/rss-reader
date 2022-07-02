import React from "react";
import { useState } from "react";
import { Text, View, Modal, TouchableOpacity } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import styles from "./AddFeedModal.styles";
import { Octicons, Entypo } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addNewFeed, deleteFeed } from "../../redux/reducers/rssSlice";

interface Props {
  setShowAddNewFeed: (addNewBoolean: boolean) => void;
  showAddNewFeed: boolean;
}

const AddFeedModal: React.FC<Props> = ({
  setShowAddNewFeed,
  showAddNewFeed,
}) => {
  const [url, setUrl] = useState("");
  const handleOnCloseModal = () => {
    setShowAddNewFeed(false);
  };
  const dispatch = useAppDispatch();
  const { rssListURLs } = useAppSelector(({ rss }) => rss);

  const handleTextOnChange = (text: string) => {
    setUrl(text);
  };

  const handleAddFeed = () => {
    if (!url.length) return;
    dispatch(addNewFeed(url));
    setUrl("");
  };

  const handleDeleteFeed = (url: string) => {
    dispatch(deleteFeed(url));
  };

  return (
    <View style={styles.container}>
      <Modal visible={showAddNewFeed}>
        <View style={styles.modalContent}>
          <View>
            <Text style={styles.title}>Agrega un nuevo feed!</Text>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={handleTextOnChange}
                style={styles.textInput}
                value={url}
              />
              <TouchableOpacity
                style={styles.addModalButton}
                onPress={handleAddFeed}
              >
                <Octicons name="diff-added" size={36} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          {rssListURLs?.length ? (
            <FlatList
              data={rssListURLs}
              renderItem={({ item: url }) => (
                <View>
                  <Text>{url}</Text>
                  <TouchableOpacity onPress={() => handleDeleteFeed(url)}>
                    <Entypo name="cross" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(url) => url}
            />
          ) : (
            <View>
              <Text>No se agregaron feeds</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={handleOnCloseModal}
          style={styles.closeButtonContainer}
        >
          <View style={styles.button}>
            <Text>Cerrar</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default AddFeedModal;

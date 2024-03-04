import React, { useLayoutEffect, useState } from "react";
import { ScrollView, Text, View, Image, Modal, TextInput, TouchableOpacity } from "react-native";
import { Button } from 'react-native-elements';
import styles from "./styles";
import BackButton from "../../components/BackButton/BackButton";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { environment } from "../../environments/environment.prod";
import MapLocator from "./MapLocator";


export default function PostDetails(props) {
  const { navigation, route } = props;
  const item = route.params;

  const [title, setTitle] = useState(route.params?.item.title);
  const [description, setDescription] = useState(route.params?.item.description);
  const [isModalVisible, setModalVisible] = useState(false);

  const id = route.params?.item.id;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: "true",
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.put(
        `${environment.apiUrl}/posts/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('Update was successful');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete(
        `${environment.apiUrl}/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('Post was deleted');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView >
        <View style={styles.carouselContainer}>
          <View style={styles.carousel}>
            <TouchableOpacity onPress={toggleModal}>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: route.params?.item.imageUrl }} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.infoRecipeContainer}>
          <TextInput
            style={styles.infoRecipeName}
            value={title}
            onChangeText={setTitle}
          />
          <View style={styles.infoContainer}>
            <Image
              style={styles.infoPhoto}
              source={require("../../../assets/icons/calendar.png")}
            />
            <Text style={styles.infoRecipe}>{route.params?.item.date} </Text>
          </View>
          <TextInput
            style={styles.infoDescriptionRecipe}
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <View style={styles.mapContainer}>
            <MapLocator latitude={route.params?.item.mapLocation.latitude} longitude={route.params?.item.mapLocation.longitude} />
          </View>
        </View>
      </ScrollView>
      <Modal visible={isModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={toggleModal}>
            <Image style={styles.modalImage} source={{ uri: route.params?.item.imageUrl }} onPress={toggleModal} />
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.buttonContainer}>
        <Button
          title="Update"
          onPress={handleUpdate}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
        />
        <Button
          title="Delete"
          onPress={handleDelete}
          buttonStyle={[styles.button, styles.deleteButton]}
          titleStyle={styles.buttonTitle}
        />
      </View>
    </View>
  );
}

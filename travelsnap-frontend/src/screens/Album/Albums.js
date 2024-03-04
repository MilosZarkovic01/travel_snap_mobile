import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import { FlatList, Text, View, Image, TouchableHighlight, Dimensions, ScrollView } from "react-native";
import styles from "./styles";
import MenuImage from "../../components/MenuImage/MenuImage";
import Carousel from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { environment } from "../../environments/environment.prod";


const { width: viewportWidth } = Dimensions.get("window");

export default function CategoriesScreen(props) {
  const { navigation } = props;
  const slider1Ref = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem("id");

        const response = await axios.get(`${environment.apiUrl}/albums/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAlbums(response.data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchData();
  }, []);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center",
        flex: 1,
      },
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const renderImage = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image style={styles.photos} source={{ uri: item }} />
    </View>
  );

  return (
    <View>
      <FlatList
        data={albums}
        renderItem={({ item }) => {
          return (
            <View style={styles.albumItemContainer}>
              <View style={styles.carouselContainer}>
                <View style={styles.carousel}>
                  <Carousel
                    ref={slider1Ref}
                    layout={'default'}
                    data={item.images}
                    renderItem={renderImage}
                    sliderWidth={viewportWidth}
                    itemWidth={viewportWidth}
                    onSnapToItem={(index) => setActiveSlide(index)}
                  />
                </View>
              </View>
              <TouchableHighlight>
                <View >
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.numbeOfPosts}>{item.numberOfPosts} posts</Text>
                </View>
              </TouchableHighlight>
            </View>
          );
        }}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
}

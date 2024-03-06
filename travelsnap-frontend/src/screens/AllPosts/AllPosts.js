import React, { useLayoutEffect, useState, useEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
import MenuImage from "../../components/MenuImage/MenuImage";
import { environment } from "../../environments/environment.prod";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { useNavigation, useIsFocused } from '@react-navigation/native';


export default function AllPosts(props) {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                const userId = await AsyncStorage.getItem("id");
                if (token !== null && userId !== null) {

                    const response = await axios.get(`${environment.apiUrl}/posts/${userId}/others-posts`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setPosts(response.data);
                }
            } catch (error) {
                console.error("Error fetching data from AsyncStorage:", error);
            }
        };
        getData();

    }, [isFocused]);

    useLayoutEffect(() => {
        navigation.setOptions({
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

    const onPressPost = (item) => {
        navigation.navigate("Post", { item });
    };

    const renderPosts = ({ item }) => {
        return (
            <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressPost(item)}>
                <View style={styles.container}>
                    <Image style={styles.photo} source={{ uri: item.imageUrl }} />
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.date}>{item.date}</Text>
                </View>
            </TouchableHighlight>
        )
    };

    return (
        <View>
            <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={posts} renderItem={renderPosts} keyExtractor={(item) => `${item.id}`} />
        </View>

    );
}

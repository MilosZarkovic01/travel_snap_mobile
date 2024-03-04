import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { environment } from "../../environments/environment.prod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from "react-native-elements";


export default function NewPost() {
    const [title, setTitle] = useState("");
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [locationData, setLocationData] = useState(null);

    const navigation = useNavigation();

    useEffect(() => {
        getAlbums();
    }, []);

    const getAlbums = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const userId = await AsyncStorage.getItem("id");
            const headers = {
                Authorization: `Bearer ${token}`
            };

            const response = await axios.get(`${environment.apiUrl}/albums/${userId}`, {
                headers: headers
            });
            setAlbums(response.data);
        } catch (error) {
            console.error("Error getting albums:", error);
        }
    };

    const getAlbumsTitle = () => {
        return albums.map(album => ({ label: album.title, value: album.id }));
    };

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            alert("Permission to access location was denied");
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocationData({ latitude: location.coords.latitude, longitude: location.coords.longitude });
        console.log(location);
    };

    const navigateToCamera = () => {
        navigation.navigate("Camera");
    };

    const handlePost = async () => {
        try {
            if (!title || !description || !selectedAlbum) {
                alert("Please fill in all fields.");
                return;
            }
            const userId = await AsyncStorage.getItem("id");
            const imageUrl = await AsyncStorage.getItem("imageUrl");

            const postData = {
                title,
                description,
                imageUrl: imageUrl,
                date: new Date().toISOString().split('T')[0],
                userId: Number(userId),
                albumId: selectedAlbum,
                mapLocationDto: {
                    latitude: locationData.latitude.toString(),
                    longitude: locationData.longitude.toString(),
                }
            };
            const token = await AsyncStorage.getItem("token");

            const headers = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            };

            console.log(postData);
            const response = await axios.post(`${environment.apiUrl}/posts`, postData, { headers });

            if (response.status === 201) {
                console.log("Post created successfully!");
                setTitle("");
                setDescription("");
                setSelectedAlbum(null);
                setImage(null);
                alert('Post is successfully created');
            } else {
                console.error("Error creating post:", response.data);
                alert("An error occurred while creating the post. Please try again later.");
            }
        } catch (error) {
            console.error("Error creating post:", error);
            alert("An error occurred while creating the post. Please try again later.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Title:</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter title..."
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Description:</Text>
                <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Enter description..."
                    multiline
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Album:</Text>
                <DropDownPicker
                    open={open}
                    value={selectedAlbum}
                    items={getAlbumsTitle()}
                    setOpen={setOpen}
                    setValue={setSelectedAlbum}
                    containerStyle={{ height: 40 }}
                    style={{ backgroundColor: '#fafafa' }}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={item => setSelectedAlbum(item.value)}
                />
            </View>
            <View style={styles.iconContainer}>
                <View style={styles.iconWrapper}>
                    <TouchableOpacity onPress={navigateToCamera}>
                        <Image source={require('../../../assets/icons/camera.png')} style={styles.icon} />
                        <Text style={styles.iconText}>Take Picture</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.iconWrapper}>
                    <TouchableOpacity onPress={getLocation}>
                        <Image source={require('../../../assets/icons/location.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <Text style={styles.iconText}>Get Current Location</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.postButton} onPress={handlePost}>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Post"
                        onPress={handlePost}
                        buttonStyle={styles.button}
                        titleStyle={styles.buttonTitle}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
}

import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library';
import { shareAsync } from 'expo-sharing';
import { environment } from "../../environments/environment.prod";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: environment.awsAccessKey,
    secretAccessKey: environment.awsSecretKey,
});

AWS.config.update({ region: environment.awsRegion });

const s3 = new AWS.S3();

const CameraComponent = () => {
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [photo, setPhoto] = useState();

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })();
    }, []);

    if (hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted. Please change this in settings.</Text>
    }

    let takePic = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
    };

    let sharePic = async () => {
        try {
            const s3Key = await uploadImageToS3(photo);

            const imageUrl = `http://travelsnap.s3-website.eu-central-1.amazonaws.com/${s3Key}`;
            await AsyncStorage.setItem('imageUrl', imageUrl);

            await shareAsync(imageUrl);
        } catch (error) {
            console.error('Error sharing image:', error);
        }
    };

    const uploadImageToS3 = async (imageData) => {
        console.log(imageData.uri);
        try {
            const imageResponse = await fetch(imageData.uri);
            const imageBlob = await imageResponse.blob();
            console.log(imageBlob);

            const params = {
                Bucket: 'travelsnap',
                Key: `image_${new Date().toISOString().split('T')[0]}.jpg`,
                Body: imageBlob,
                ContentType: 'image/jpg'
            };

            const res = await s3.putObject(params).promise();
            console.log('Image uploaded successfully:', res);
            return params.Key;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    let savePhoto = () => {
        MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
            setPhoto(undefined);
        });
    };

    if (photo) {
        return (
            <SafeAreaView style={styles.container}>
                <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
                <Button title="Share" onPress={sharePic} />
                {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
                <Button title="Discard" onPress={() => setPhoto(undefined)} />
            </SafeAreaView>
        );
    }

    return (
        <Camera style={styles.container} ref={cameraRef}>
            <View style={styles.buttonContainer}>
                <Button title="Take Pic" onPress={takePic} />
            </View>
            <StatusBar style="auto" />
        </Camera>
    );
};


export default CameraComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        backgroundColor: '#fff',
        alignSelf: 'flex-end'
    },
    preview: {
        alignSelf: 'stretch',
        flex: 1
    }
});

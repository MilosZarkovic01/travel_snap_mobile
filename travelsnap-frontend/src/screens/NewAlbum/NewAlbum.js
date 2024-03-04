import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { environment } from '../../environments/environment.prod';

export default function NewAlbum() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleCreate = async () => {
        if (!title.trim() || !description.trim()) {
            alert('Please fill in all fields.');
            return;
        }

        const userId = await AsyncStorage.getItem('id');
        const token = await AsyncStorage.getItem('token');

        const requestData = {
            title,
            description,
            userId: Number(userId),
        };

        console.log(requestData);

        try {
            const response = await axios.post(`${environment.apiUrl}/albums`, requestData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 201) {
                alert('Album created successfully!');
            } else {
                alert('Error creating album. Please try again later.');
            }
        } catch (error) {
            alert('Error creating album. Please try again later.');
            console.error('Error creating album:', error);
        }

        setTitle('');
        setDescription('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title:</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter title..."
            />
            <Text style={styles.label}>Description:</Text>
            <TextInput
                style={[styles.input, styles.descriptionInput]}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter description..."
                multiline
            />
            <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
                <Text style={styles.createButtonText}>Create Album</Text>
            </TouchableOpacity>
        </View>
    );
}

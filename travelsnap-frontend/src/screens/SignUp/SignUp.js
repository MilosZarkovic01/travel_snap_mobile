import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import styles from './styles';
import { environment } from "../../environments/environment.prod";


const Signup = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');

    const submitHandler = async () => {
        try {
            const response = await axios.post(environment.apiUrl + '/auth/register', {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                age: age,
            });

            alert('Signup successful!');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error while signing up:', error);
            alert(error.message);
        }
    };

    return (
        <View style={styles.containerView}>
            <View style={styles.signupScreenContainer}>
                <View style={styles.signupFormView}>
                    <Text style={styles.logoText}>Sign Up</Text>
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.signupFormTextInput}
                    />
                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.signupFormTextInput}
                    />
                    <TextInput
                        label="First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                        style={styles.signupFormTextInput}
                    />
                    <TextInput
                        label="Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                        style={styles.signupFormTextInput}
                    />
                    <TextInput
                        label="Age"
                        value={age}
                        onChangeText={setAge}
                        keyboardType="numeric"
                        style={styles.signupFormTextInput}
                    />
                    <Button mode="contained" onPress={submitHandler} style={styles.signupButton}>
                        Sign Up
                    </Button>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginLink}>Already have an account? Log in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Signup;

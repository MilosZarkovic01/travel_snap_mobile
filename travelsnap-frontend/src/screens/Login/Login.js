import React, { useState } from "react";
import axios from "axios";
import styles from "./styles";
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { environment } from "../../environments/environment.prod";


export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginPress = async () => {
    try {
      const response = await axios.post(environment.apiUrl + '/auth/login', {
        email: email,
        password: password,
      });

      const token = response.data.token;
      const id = response.data.userDto.id;
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('id', id.toString());

      alert('Login successful!');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error while signing up:', error);
      alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Travel Snap</Text>
            <TextInput
              placeholder="Email"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="Password"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              secureTextEntry={true}
              onChangeText={setPassword}
            />
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => onLoginPress()}
              title="Login"
            />
            <Button
              containerStyle={styles.fbLoginButton}
              type="clear"
              onPress={() => navigation.navigate('SignUp')}
              title="Sign up"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

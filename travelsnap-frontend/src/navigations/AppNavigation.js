import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from '../screens/Home/HomeScreen';
import Albums from '../screens/Album/Albums';
import Post from '../screens/Post/Post';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
import Login from '../screens/Login/Login';
import Signup from '../screens/SignUp/SignUp';
import NewPost from '../screens/NewPost/NewPost';
import CameraComponent from '../screens/Camera/CameraComponent';
import NewAlbum from '../screens/NewAlbum/NewAlbum';
import AllPosts from '../screens/AllPosts/AllPosts';


const Stack = createStackNavigator();

function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontWeight: 'bold',
          textAlign: 'center',
          alignSelf: 'center',
          flex: 1,
        }
      }}
    >
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='SignUp' component={Signup} />
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Albums' component={Albums} />
      <Stack.Screen name='Post' component={Post} options={{ headerShown: false }} />
      <Stack.Screen name='NewPost' component={NewPost} />
      <Stack.Screen name='Camera' component={CameraComponent} />
      <Stack.Screen name='NewAlbum' component={NewAlbum} />
      <Stack.Screen name='AllPosts' component={AllPosts} />
    </Stack.Navigator>
  )
}



const Drawer = createDrawerNavigator();

function DrawerStack() {
  return (
    <Drawer.Navigator
      drawerPosition='left'
      initialRouteName='Main'
      drawerStyle={{
        width: 250
      }}
      screenOptions={{ headerShown: false }}
      drawerContent={({ navigation }) => <DrawerContainer navigation={navigation} />}
    >
      <Drawer.Screen name='Main' component={MainNavigator} />
    </Drawer.Navigator>
  )
}


export default function AppContainer() {
  return (
    <NavigationContainer>
      <DrawerStack />
    </NavigationContainer>
  )
}


console.disableYellowBox = true;
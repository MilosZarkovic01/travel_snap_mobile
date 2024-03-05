import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import MenuButton from "../../components/MenuButton/MenuButton";

export default function DrawerContainer(props) {
  const { navigation } = props;
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <MenuButton
          title="HOME"
          source={require("../../../assets/icons/home.png")}
          onPress={() => {
            navigation.navigate("Home");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="OTHERS POSTS"
          source={require("../../../assets/icons/search.png")}
          onPress={() => {
            navigation.navigate("AllPosts");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="CREATE NEW POST"
          source={require("../../../assets/icons/post.png")}
          onPress={() => {
            navigation.navigate("NewPost");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="CREATE NEW ALBUM"
          source={require("../../../assets/icons/post.png")}
          onPress={() => {
            navigation.navigate("NewAlbum");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="ALBUMS"
          source={require("../../../assets/icons/search.png")}
          onPress={() => {
            navigation.navigate("Albums");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="LOGOUT"
          source={require("../../../assets/icons/close.png")}
          onPress={() => {
            navigation.navigate("Login");
            navigation.closeDrawer();
          }}
        />
      </View>
    </View>
  );
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

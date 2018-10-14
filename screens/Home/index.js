import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

class Home extends Component {
  state = {};

  render() {
    console.log("render home.js");
    const menuOptions = [
      { name: "Play", screen: "play" },
      { name: "Settings", screen: "settings" }
    ];

    return (
      <View style={styles.container}>
        <Text>Home</Text>
        {menuOptions.map((menuObj, index) => {
          return (
            <TouchableOpacity
              key={"menu item #" + index}
              onPress={() => this.props.changeScreen(menuObj.screen)}
              style={styles.menuButton}
            >
              {menuObj.name}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  menuButton: {
    backgroundColor: "green"
  }
});

export default Home;

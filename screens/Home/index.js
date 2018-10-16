import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { theme } from "../../styles";

class Home extends Component {
  state = {};

  render() {
    const menuOptions = [
      { name: "Play", screen: "play" },
      { name: "Settings", screen: "settings" },
      { name: "Sandbox", screen: "sandbox" }
    ];

    return (
      <View style={styles.container}>
        <Text>Home</Text>
        {menuOptions.map((menuObj, index) => {
          return (
            <TouchableOpacity
              key={"menu item #" + index}
              onPress={() => this.props.changeScreen(menuObj.screen)}
              style={theme.menuButton}
            >
              <Text style={theme.menuButtonText}>{menuObj.name}</Text>
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
  }
});

export default Home;

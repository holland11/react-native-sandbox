import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

class Game extends Component {
  state = {};

  render() {
    console.log("render game.js");
    return (
      <View style={styles.container}>
        <Text>{"Game"}</Text>
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

export default Game;

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

class Settings extends Component {
  state = {};

  render() {
    console.log("render settings.js");
    return (
      <View style={styles.container}>
        <Text>{"Settings"}</Text>
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

export default Settings;

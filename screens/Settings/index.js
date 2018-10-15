import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { theme } from "../../styles";

class Settings extends Component {
  state = {};

  render() {
    console.log("render settings.js");
    return (
      <View style={styles.container}>
        <Text>{"Settings"}</Text>
        <TouchableOpacity
          style={theme.menuButton}
          onPress={() => this.props.backToHome()}
        >
          <Text style={theme.menuButtonText}>Back</Text>
        </TouchableOpacity>
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

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import { theme } from "../../styles";

class ProgressBar extends Component {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.progressText}>
          {this.props.progress * 100 + "%"}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center"
  },
  progressText: {
    fontSize: 22,
    fontColor: "black"
  }
});

export default ProgressBar;

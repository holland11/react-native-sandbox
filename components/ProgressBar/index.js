import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import { theme } from "../../styles";

class ProgressBar extends Component {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.progressText}>
          {this.props.progress.score + " / " + this.props.progress.maxScore}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange"
  },
  progressText: {
    fontSize: 22,
    fontWeight: "bold"
  }
});

export default ProgressBar;

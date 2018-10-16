import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";

import { theme } from "../../styles";

class Sandbox extends Component {
  state = {
    cellValues: [1, 2]
  };

  onSwipeRight = cellIndex => {
    this.swapValues(cellIndex, cellIndex + 1);
  };

  onSwipeLeft = cellIndex => {
    this.swapValues(cellIndex, cellIndex - 1);
  };

  swapValues = (cell1, cell2) => {
    const newValues = [...this.state.cellValues];
    const temp = newValues[cell1];
    newValues[cell1] = newValues[cell2];
    newValues[cell2] = temp;
    this.setState({ cellValues: newValues });
  };

  render() {
    const { cellValues } = this.state;
    return (
      <View style={styles.container}>
        <Text>{"Sandbox"}</Text>
        <TouchableOpacity
          style={theme.menuButton}
          onPress={() => this.props.backToHome()}
        >
          <Text style={theme.menuButtonText}>Back</Text>
        </TouchableOpacity>
        <View style={styles.cellsContainer}>
          <GestureRecognizer
            style={styles.cell}
            onSwipeRight={() => this.onSwipeRight(0)}
          >
            <Text style={styles.cellText}>{cellValues[0]}</Text>
          </GestureRecognizer>
          <GestureRecognizer
            style={styles.cell}
            onSwipeLeft={() => this.onSwipeLeft(1)}
          >
            <Text style={styles.cellText}>{cellValues[1]}</Text>
          </GestureRecognizer>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  cellsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  cell: {
    flex: 1,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "black",
    padding: 2,
    margin: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cellText: {
    fontSize: 30
  }
});

export default Sandbox;

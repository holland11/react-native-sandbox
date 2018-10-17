import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing
} from "react-native";
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
          <Cell
            onSwipeRight={() => this.onSwipeRight(0)}
            value={cellValues[0]}
          />
          <Cell onSwipeLeft={() => this.onSwipeLeft(1)} value={cellValues[1]} />
        </View>
      </View>
    );
  }
}

class Cell extends Component {
  constructor(props) {
    super(props);
    this.xTranslate = new Animated.Value(0);
    this.state = {
      moveX: this.xTranslate.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 50]
      })
    };
  }
  swipeLeft = () => {
    if (!this.props.onSwipeLeft) return;
    this.xTranslate.setValue(0);
    Animated.timing(this.xTranslate, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear
    }).start();
    this.props.onSwipeLeft();
  };
  swipeRight = () => {
    if (!this.props.onSwipeRight) return;
    this.xTranslate.setValue(0);
    Animated.timing(this.xTranslate, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear
    }).start();
    this.props.onSwipeRight();
  };
  render() {
    let translateStyle = { transform: [{ translateX: this.state.moveX }] };
    return (
      <Animated.View style={[translateStyle]}>
        <GestureRecognizer
          style={styles.cell}
          onSwipeLeft={this.swipeLeft}
          onSwipeRight={this.swipeRight}
        >
          <Text style={styles.cellText}>{this.props.value}</Text>
        </GestureRecognizer>
      </Animated.View>
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

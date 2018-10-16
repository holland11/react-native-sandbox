import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from "react-native";
import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";

import { constants } from "../../constants";
import { theme } from "../../styles";

class GameBoard extends Component {
  state = {};

  onSwipeUp = (gestureState, rowNum, colNum) => {
    this.props.swapCells(rowNum, colNum, rowNum - 1, colNum);
  };

  onSwipeDown = (gestureState, rowNum, colNum) => {
    this.props.swapCells(rowNum, colNum, rowNum + 1, colNum);
  };

  onSwipeLeft = (gestureState, rowNum, colNum) => {
    this.props.swapCells(rowNum, colNum, rowNum, colNum - 1);
  };

  onSwipeRight = (gestureState, rowNum, colNum) => {
    this.props.swapCells(rowNum, colNum, rowNum, colNum + 1);
  };

  render() {
    const { board } = this.props;
    return (
      <View style={styles.container}>
        {board.map((rowArray, index) => {
          return rowArray.map((cellValue, index2) => {
            return (
              <GestureRecognizer
                key={"cell(" + index + "," + index2 + ")"}
                style={styles.cell}
                onSwipeUp={state => this.onSwipeUp(state, index, index2)}
                onSwipeDown={state => this.onSwipeDown(state, index, index2)}
                onSwipeLeft={state => this.onSwipeLeft(state, index, index2)}
                onSwipeRight={state => this.onSwipeRight(state, index, index2)}
              >
                <Text>{cellValue}</Text>
              </GestureRecognizer>
            );
          });
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    backgroundColor: "blue"
  },
  cell: {
    margin: 1,
    width: Dimensions.get("window").width / constants.boardSize - 6,
    height: Dimensions.get("window").width / constants.boardSize - 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  }
});

export default GameBoard;

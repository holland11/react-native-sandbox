import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import GameBoard from "../../components/GameBoard";
import ProgressBar from "../../components/ProgressBar";

import { theme } from "../../styles";
import { constants } from "../../constants";

class Game extends Component {
  state = {
    board: [this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])]
  };

  shuffle = a => {
    // https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  };

  swapCells = (c1y, c1x, c2y, c2x) => {
    const { board } = this.state;
    const vals = [c1y, c1x, c2y, c2x];
    const invalid = vals.filter(val => val < 0 || val >= constants.boardSize);
    if (invalid.length > 0) {
      console.log("invalid swap");
      return;
    } else {
      const newBoard = [...board];
      const temp = newBoard[c1y][c1x];
      newBoard[c1y][c1x] = board[c2y][c2x];
      newBoard[c2y][c2x] = temp;
      this.setState({ board: newBoard });
    }
  };

  render() {
    const { board } = this.state;
    return (
      <View style={styles.container}>
        <Text>{"Game"}</Text>
        <GameBoard board={board} swapCells={this.swapCells} />
        <ProgressBar progress={0.5} />
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

export default Game;

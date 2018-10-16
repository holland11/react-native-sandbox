import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import GameBoard from "../../components/GameBoard";
import ProgressBar from "../../components/ProgressBar";

import { theme } from "../../styles";
import { constants } from "../../constants";

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

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.generateBoard()
    };
  }

  componentDidMount() {
    this.checkBoardForMatches();
  }

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
      this.checkBoardForMatches();
    }
  };

  checkBoardForMatches = () => {
    const { board } = this.state;

    if (!board || board.length < 1 || board[0].length < 1) {
      console.log(board);
      console.log("board is in an unacceptable state and is logged above.");
      return;
    }

    const cellsToRemove = [];

    // horizontal checks
    for (let y = 0; y < board.length; y++) {
      let matches = 1;
      let currentTile = board[y][0];
      for (let x = 1; x < board[y].length; x++) {
        if (board[y][x] === currentTile) {
          matches++;
        }
        if (board[y][x] !== currentTile || x === board[y].length - 1) {
          if (matches >= 3) {
            for (let i = 0; i < matches; i++) {
              cellsToRemove.push({ x: x - i, y });
            }
          }
          currentTile = board[y][x];
          matches = 1;
        }
      }
    }

    // vertical checks
    for (let x = 0; x < board[0].length; x++) {
      let matches = 1;
      let currentTile = board[0][x];
      for (let y = 1; y < board.length; y++) {
        if (board[y][x] === currentTile) {
          matches++;
        }
        if (board[y][x] !== currentTile || y === board.length - 1) {
          if (matches >= 3) {
            for (let i = 0; i < matches; i++) {
              if (cellsToRemove.includes({ x, y: y - i })) {
                console.log("cell (${x},${y}) is in two matches");
              } else {
                cellsToRemove.push({ x, y: y - i });
              }
            }
          }
          currentTile = board[y][x];
          matches = 1;
        }
      }
    }

    if (cellsToRemove.length > 0) {
      this.removeAndReplaceCells(cellsToRemove);
    }
  };

  removeAndReplaceCells = cellsToRemove => {
    const { board } = this.state;
    const newBoard = [];
    // deep copy so we can modify without affecting this.state.board
    for (let i = 0; i < board.length; i++) {
      newBoard.push([...board[i]]);
    }

    const columnsToFill = []; // which columns need to be filled and how many cells in each of them
    for (let i = 0; i < cellsToRemove.length; i++) {
      const cell = cellsToRemove[i];
      let columnIndex = columnsToFill.findIndex(
        colObj => colObj.column === cell.x
      );
      if (columnIndex === -1) {
        columnsToFill.push({ column: cell.x, maxY: cell.y });
      } else {
        if (columnsToFill[columnIndex].maxY < cell.y) {
          columnsToFill[columnIndex].maxY = cell.y;
        }
      }
      newBoard[cell.y][cell.x] = undefined;
    }

    for (let i = 0; i < columnsToFill.length; i++) {
      let column = columnsToFill[i];
      let x = column.column;
      let count = 1; // count is the number of rows upwards we need to go to pull the new value for any given cell
      // for example, if cell (0,3),(0,2),(0,1) were removed, the new value for cell (0,3) would be from (0,0) and the count would be 3
      for (let y = column.maxY; y >= 0; y--) {
        if (y - count < 0) {
          // no cells left above to drop down so we must generate a new one
          newBoard[y][x] = this.getRandomCellType();
        } else if (newBoard[y - count][x] === undefined) {
          // increment count and re-do this loop iteration again by cancelling out the y--
          count++;
          y++;
          continue;
        } else {
          newBoard[y][x] = newBoard[y - count][x];
        }
      }
    }

    this.setState({ board: newBoard }, this.checkBoardForMatches);
  };

  generateBoard = () => {
    const board = [];
    for (let y = 0; y < constants.boardSize; y++) {
      board.push([]);
      for (let x = 0; x < constants.boardSize; x++) {
        board[y].push(this.getRandomCellType());
      }
    }
    return board;
  };

  getRandomCellType = () => {
    return Math.floor(Math.random() * constants.numCellTypes);
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

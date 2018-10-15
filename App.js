import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./screens/Home";
import Game from "./screens/Game";
import Settings from "./screens/Settings";

export default class App extends Component {
  state = {
    activeScreen: "home"
  };

  changeScreen = next_screen => {
    this.handleChange("activeScreen", next_screen);
  };

  handleChange = (index, value) => {
    this.setState({ [index]: value });
  };

  render() {
    const { activeScreen } = this.state;
    return (
      <View style={styles.container}>
        {activeScreen === "home" && <Home changeScreen={this.changeScreen} />}
        {activeScreen === "play" && (
          <Game backToHome={() => this.changeScreen("home")} />
        )}
        {activeScreen === "settings" && (
          <Settings backToHome={() => this.changeScreen("home")} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center"
  }
});

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import * as Font from "expo-font";

class Start extends React.Component {
  constructor() {
    super();
    this.state = {
      fontloaded: false,
    };
    this.Press = this.Press.bind(this);
  }
  componentDidMount = async () => {
    await Font.loadAsync({
      fajnaCzcionka: require("./font/go3v2.ttf"),
    });
    this.setState({ fontloaded: true });
  };
  Press() {
    this.props.navigation.navigate("s2");
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar />
        <TouchableOpacity onPress={this.Press}>
          {this.state.fontloaded ? (
            <Text
              style={{
                fontFamily: "fajnaCzcionka",
                textAlign: "center",
                fontSize: 70,
                color: "white",
              }}
            >
              Camera App
            </Text>
          ) : null}
        </TouchableOpacity>
        <Text style={styles.text2}>
          show gallery pictures take pictures from camera save photo to device
          delete photos from device share photo
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F57C00",
  },
  text1: {
    fontSize: 60,
    textAlign: "center",
    marginBottom: 20,
  },
  text2: {
    fontSize: 30,
    textAlign: "center",
    color: "white",
  },
});
export { Start };

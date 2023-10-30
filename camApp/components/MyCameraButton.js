import * as React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

class MyCameraButton extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    if (this.props.button === "left") {
      return (
        <View
          style={{
            backgroundColor: "#F57C00",
            borderRadius: 80,
            width: 80,
            height: 80,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 30,
            zIndex: 1,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.fun();
            }}
          >
            <Image
              style={{ width: 50, height: 50 }}
              source={require("./gfx/refresh.png")}
            ></Image>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.button === "mid") {
      return (
        <View
          style={{
            backgroundColor: "#F57C00",
            borderRadius: 100,
            justifyContent: "center",
            width: 100,
            height: 100,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.fun();
            }}
          >
            <Image
              style={{ width: 50, height: 50 }}
              source={require("./gfx/camera.png")}
            ></Image>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.button === "right") {
      return (
        <View
          style={{
            backgroundColor: "#F57C00",
            borderRadius: 80,
            width: 80,
            height: 80,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 30,
            zIndex: 1,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.fun();
            }}
          >
            <Image
              style={{ width: 50, height: 50 }}
              source={require("./gfx/settings.png")}
            ></Image>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
export { MyCameraButton };

import * as React from "react";
import {
  View,
  Text,
  Animated,
  BackHandler,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { Camera } from "expo-camera";
import { RadioGroup } from "./RadioGroup";
import { MyCameraButton } from "./MyCameraButton";
import * as MediaLibrary from "expo-media-library";
class MyCamera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pos: new Animated.Value(Dimensions.get("window").height),
      hasCameraPermission: null, // przydzielone uprawnienia do używania kamery
      type: Camera.Constants.Type.back, // typ kamery
      data: [
        {
          id: 0,
          title: "White Balance",
          group: "wb",
          radios: [
            {
              id: 0,
              value: "auto",
              clicked: true,
            },
            {
              id: 1,
              value: "cloudy",
              clicked: false,
            },
            {
              id: 2,
              value: "fluorescent",
              clicked: false,
            },
            {
              id: 3,
              value: "inscandescen",
              clicked: false,
            },
            {
              id: 4,
              value: "shadow",
              clicked: false,
            },
            {
              id: 5,
              value: "sunny",
              clicked: false,
            },
          ],
        },
        {
          id: 1,
          title: "Flash Mode",
          group: "fm",
          radios: [
            {
              id: 0,
              value: "auto",
              clicked: true,
            },
            {
              id: 1,
              value: "off",
              clicked: false,
            },
            {
              id: 2,
              value: "on",
              clicked: false,
            },
            {
              id: 3,
              value: "torch",
              clicked: false,
            },
          ],
        },
        {
          id: 2,
          title: "Camera Ratio",
          group: "ratio",
          radios: [
            {
              id: 0,
              value: "4:3",
              clicked: true,
            },
            {
              id: 1,
              value: "16:9",
              clicked: false,
            },
          ],
        },
        {
          id: 3,
          title: "Picture Sizes",
          group: "ps",
          radios: [
            {
              id: 0,
              value: "640x360",
              clicked: true,
            },
            {
              id: 1,
              value: "1280x720",
              clicked: false,
            },
            {
              id: 2,
              value: "1920x1080",
              clicked: false,
            },
            {
              id: 3,
              value: "3840x2160",
              clicked: false,
            },
          ],
        },
      ],
      ratio: "4:3",
      wb: 0,
      fm: 3,
      ps: "320x240",
      ratios: ["4:3", "16:9"],
    };
    this.isHidden = true;
    this.height = Dimensions.get("window").height;
    this.changeCamera = this.changeCamera.bind(this);
    this.takePhoto = this.takePhoto.bind(this);
    this.toggle = this.toggle.bind(this);
    this.radioHandler = this.radioHandler.bind(this);
    this.getSizes = this.getSizes.bind(this);
    this.setSizes = this.setSizes.bind(this);
  }
  toggle() {
    let toPos;
    if (this.isHidden) toPos = 0;
    else toPos = Dimensions.get("window").height;
    Animated.spring(this.state.pos, {
      toValue: toPos,
      velocity: 1,
      tension: 0,
      friction: 10,
      useNativeDriver: true,
    }).start();
    this.isHidden = !this.isHidden;
  }
  async componentDidMount() {
    let { status } = await Camera.requestCameraPermissionsAsync();
    this.setState({ hasCameraPermission: status == "granted" });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };
  changeCamera() {
    this.setState({
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
    });
  }
  async takePhoto() {
    if (this.camera) {
      let foto = await this.camera.takePictureAsync();
      let asset = await MediaLibrary.createAssetAsync(foto.uri);
      alert(JSON.stringify(asset, null, 4));
      this.props.route.params.updatePhotos(asset);
    }
  }
  async radioHandler(groupId, radioId, value, group) {
    let data = this.state.data;
    for (let x = 0; x < data[groupId].radios.length; x++) {
      console.log("aaa:");
      console.log(data[groupId].radios[x].clicked);
      data[groupId].radios[x].clicked = false;
    }
    data[groupId].radios[radioId].clicked = true;
    this.setState({
      data: data,
    });
    console.log(Camera.Constants.WhiteBalance);
    console.log(Camera.Constants.FlashMode);
    switch (group) {
      case "wb":
        this.setState({
          wb: value,
        });
        break;
      case "fm":
        this.setState({
          fm: value,
        });
        break;
      case "ps":
        this.setState({
          ps: value,
        });
        break;
      case "ratio":
        await this.setSizes();
        this.setState({
          ratio: value,
        });
        break;
    }
  }
  getSizes = async () => {
    if (this.camera) {
      console.log(this.state.ratio);
      const sizes = await this.camera.getAvailablePictureSizesAsync(
        this.state.ratio
      );
      return sizes;
    }
  };
  async setSizes() {
    let sizes = await this.getSizes();
    let sizes2 = this.state.data;
    let data2 = [];
    for (let x = 0; x < sizes.length; x++) {
      if (x === 0) {
        data2[x] = {
          id: x,
          value: sizes[x],
          clicked: true,
        };
      } else {
        data2[x] = {
          id: x,
          value: sizes[x],
          clicked: false,
        };
      }
    }
    console.log(sizes);
    sizes2[3].radios = data2;
    this.setState({
      data: sizes2,
      ps: sizes[0],
    });
  }
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission == null) {
      return <View />;
    } else if (hasCameraPermission == false) {
      return <Text>brak dostępu do kamery</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ref={(ref) => {
              this.camera = ref; // Uwaga: referencja do kamery używana później
            }}
            style={{ flex: 1 }}
            type={this.state.type}
            onCameraReady={async () => {
              this.setSizes();
            }}
            ratio={this.state.ratio}
            whiteBalance={this.state.wb}
            pictureSize={this.state.ps}
            flashMode={this.state.fm}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                bottom: 20,
                alignItems: "flex-end",
              }}
            >
              <MyCameraButton button="left" fun={this.changeCamera} />
              <MyCameraButton button="mid" fun={this.takePhoto} />
              <MyCameraButton button="right" fun={this.toggle} />
            </View>
            <Animated.View
              style={[
                styles.animatedView,
                {
                  transform: [{ translateY: this.state.pos }],
                },
              ]}
            >
              <ScrollView style={{ flex: 1 }}>
                {this.state.data.map((item, i) => {
                  return (
                    <RadioGroup
                      key={i}
                      title={item.title}
                      radios={item.radios}
                      id={item.id}
                      radioHandler={this.radioHandler}
                      groupName={item.group}
                    />
                  );
                })}
              </ScrollView>
            </Animated.View>
          </Camera>
        </View>
      );
    }
  }
}
let styles = StyleSheet.create({
  animatedView: {
    position: "absolute",
    width: Dimensions.get("window").width / 2,
    left: 0,
    right: 0,
    zIndex: 10,
    elevation: 10,
    backgroundColor: "#00000088",
    height: Dimensions.get("window").height,
  },
});
export { MyCamera };

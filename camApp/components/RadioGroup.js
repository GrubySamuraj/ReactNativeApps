import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MyRadio } from "./RadioButton";

class MyRadioGroup extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.radioHandler = this.radioHandler.bind(this);
  }
  radioHandler(id, value) {
    this.props.radioHandler(this.props.id, id, value, this.props.groupName);
  }
  render() {
    return (
      <View>
        <Text style={{ color: "#00ff00", textAlign: "center", fontSize: 15 }}>
          {this.props.title}
        </Text>
        {this.props.radios.map((radio, i) => {
          return (
            <View style={styles.row}>
              <MyRadio
                key={i}
                clicked={radio.clicked}
                radioHandler={this.radioHandler}
                id={radio.id}
                value={radio.value}
              />
              <Text style={styles.label}>{radio.value}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}
let styles = StyleSheet.create({
  label: {
    color: "#FFFFFF",
    marginLeft: 20,
  },
  row: {
    flexDirection: "row",
    margin: 5,
  },
});
export { MyRadioGroup };

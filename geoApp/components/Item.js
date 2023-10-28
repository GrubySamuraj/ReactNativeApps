import * as React from 'react';
import { View, Text, Image, StyleSheet, Switch } from 'react-native';

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEnabled: props.data.isEnabled,
            val: this.props.bigSwitch
        };
        this.val = this.props.bigSwitch
        // this.setState({
        //     isEnabled: props.data.isEnabled
        // })
        this.toggleSwitch = this.toggleSwitch.bind(this);
    }
    toggleSwitch() {
        this.props.toggleSwitch(this.props.data.id, this.state.isEnabled);
        this.setState({
            isEnabled: !this.state.isEnabled
        })
    }
    render() {
        console.log(this.state.val);
        console.log("big: ");
        console.log(this.props.bigSwitch);
        if (this.props.bigSwitch) {
            return (
                <View style={styles.container}>
                    <Image
                        source={require("./gfx/desktop.png")}
                        style={styles.image}
                    ></Image>
                    <View>
                        <Text style={styles.text}>Timestamp:</Text>
                        <Text style={styles.text}>{this.props.data.timestamp}</Text>
                        <Text style={{ fontSize: 15 }}>latitude: {this.props.data.coords.latitude}</Text>
                        <Text style={{ fontSize: 15 }}>longitude: {this.props.data.coords.longitude}</Text>
                    </View>
                    <Switch
                        style={{ marginLeft: 30 }}
                        trackColor={{ false: "#767577", true: "#E1BEE7" }}
                        thumbColor={this.state.isEnabled ? "#9C27B0" : "#f4f3f4"}
                        onValueChange={() => { this.toggleSwitch() }}
                        value={this.props.bigSwitch}
                    />
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <Image
                        source={require("./gfx/desktop.png")}
                        style={styles.image}
                    ></Image>
                    <View>
                        <Text style={styles.text}>Timestamp:</Text>
                        <Text style={styles.text}>{this.props.data.timestamp}</Text>
                        <Text style={{ fontSize: 15 }}>latitude: {this.props.data.coords.latitude}</Text>
                        <Text style={{ fontSize: 15 }}>longitude: {this.props.data.coords.longitude}</Text>
                    </View>
                    <Switch
                        style={{ marginLeft: 30 }}
                        trackColor={{ false: "#767577", true: "#E1BEE7" }}
                        thumbColor={this.state.isEnabled ? "#9C27B0" : "#f4f3f4"}
                        onValueChange={() => { this.toggleSwitch() }}
                        value={this.state.isEnabled}
                    />
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        color: "#7B1FA2",
        textAlign: "left",
        fontWeight: "500",
        fontSize: 18
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 50
    }
});
export default Item;
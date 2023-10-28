import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Column } from './column';
import { Column2 } from "./column2";
class Keyboard extends React.Component {
    constructor() {
        super();
        this.press = this.press.bind(this);
    }
    press(num) {
        console.log(num);
        this.props.add(num);
    }
    render() {
        if (this.props.isPortrait) {
            return (
                <View style={styles.container}>
                    <Column tile1="1" tile2="4" tile3="7" tile4="." press={this.press} />
                    <Column tile1="2" tile2="5" tile3="8" tile4="0" press={this.press} />
                    <Column tile1="3" tile2="6" tile3="9" tile4="=" press={this.press} />
                    <Column2 press={this.press} />
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <Column tile1="1" tile2="4" tile3="7" tile4="." press={this.press} />
                    <Column tile1="2" tile2="5" tile3="8" tile4="0" press={this.press} />
                    <Column tile1="3" tile2="6" tile3="9" tile4="=" press={this.press} />
                    <Column tile1="Sqrt" tile2="Pow" tile3="Sin" tile4="Cos" press={this.press} />
                    <Column2 press={this.press} />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 6,
        flexDirection: "row",
        backgroundColor: '#333',
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap"
    },
});
export { Keyboard };

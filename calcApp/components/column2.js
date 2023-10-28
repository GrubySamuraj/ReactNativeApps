import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Tile } from './tile';
class Column2 extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <View style={styles.container}>
                <Tile value="Del" press={this.props.press} />
                <Tile value="C" press={this.props.press} />
                <Tile value="/" press={this.props.press} />
                <Tile value="*" press={this.props.press} />
                <Tile value="-" press={this.props.press} />
                <Tile value="+" press={this.props.press} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#777",
    },
});
export { Column2 };
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Tile } from './tile';
class Column extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <View style={styles.container}>
                <Tile value={this.props.tile1} press={this.props.press} />
                <Tile value={this.props.tile2} press={this.props.press} />
                <Tile value={this.props.tile3} press={this.props.press} />
                <Tile value={this.props.tile4} press={this.props.press} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
export { Column };
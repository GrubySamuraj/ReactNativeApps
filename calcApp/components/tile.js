import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

class Tile extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => { this.props.press(this.props.value); }}>
                <View style={styles.container}>
                    <Text style={styles.text}>{this.props.value}</Text>
                </View>
            </TouchableOpacity>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 40,
        textAlign: "center",
        color: "white"
    },
    touch: {
        flex: 1
    }
});
export { Tile };
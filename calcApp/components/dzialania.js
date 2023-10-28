import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Dzialania extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.obliczenia}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        width: 1000,
        backgroundColor: '#fff',
        alignItems: "flex-end",
        justifyContent: 'center',
    },
    text: {
        fontSize: 50
    }
});
export { Dzialania };

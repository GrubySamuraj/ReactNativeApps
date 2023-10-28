import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Wynik extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.wynik}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0e0e0',
        alignItems: "flex-end",
        justifyContent: 'center',
    },
    text: {
        fontSize: 40
    }
});
export { Wynik };

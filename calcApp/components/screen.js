import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Wynik } from "./wynik";
import { Dzialania } from "./dzialania";
class Screen extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <View style={styles.container}>
                <Dzialania obliczenia={this.props.obliczenia} />
                <Wynik wynik={this.props.wynik} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: '#e0e0e0',
        alignItems: "flex-end",
        justifyContent: 'center',
    },
});
export { Screen };

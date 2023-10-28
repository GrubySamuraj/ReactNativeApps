import * as React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

class Screen3 extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.route.params);
        this.data = new Date(this.props.route.params.registred);
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <Image
                    style={styles.image}
                    source={require('./gfx/userHigh.png')}
                />
                <Text>login:</Text>
                <Text style={styles.text}>{this.props.route.params.username}</Text>
                <Text>password:</Text>
                <Text style={styles.text}>{this.props.route.params.password}</Text>
                <Text>registred:</Text>
                <Text style={styles.text}>{this.data.toLocaleDateString('en-GB', { timeZoneName: "long" })} {this.data.toLocaleTimeString('en-US', { hour12: false })}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
    },
    button: {
        width: 100,
        height: 50
    },
    image: {
        width: 250,
        height: 250,
        marginTop: 30
    },
    text: {
        fontSize: 25,
        padding: 20
    }
});
export default Screen3;
import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class MyRadio extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            isClicked: false
        }
    }
    render() {
        return (
            <TouchableOpacity onPress={() => { this.props.radioHandler(this.props.id, this.props.value); }} >
                <View style={styles.radioOuter}>
                    <View style={[styles.radioInner, { opacity: this.props.clicked ? 1 : 0 }]}></View>
                </View>
            </TouchableOpacity>
        );
    }
}
let styles = StyleSheet.create({
    radioOuter: {
        borderColor: "#FFE0B2",
        borderWidth: 2,
        borderRadius: 25,
        width: 25,
        height: 25,
        alignItems: "center",
        justifyContent: "center"
    },
    radioInner: {
        backgroundColor: "#FFE0B2",
        borderRadius: 15,
        width: 15,
        height: 15
    }
});
export default MyRadio;
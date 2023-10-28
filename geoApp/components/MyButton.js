import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class MyButton extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (
            <View style={{ backgroundColor: "#7B1FA2", padding: 5, borderRadius: 6, margin: 6, justifyContent: "center", width: 150 }}>
                <TouchableOpacity onPress={() => { this.props.fun(); }}>
                    <Text style={{ color: "#FFFFFF", fontSize: 20, textAlign: "center" }}>{this.props.value}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default MyButton;
import * as React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

class MyButton2 extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (
            <View style={{ backgroundColor: "#E91E63", padding: 5, borderRadius: 6, margin: 6, justifyContent: "center" }}>
                <TouchableOpacity onPress={() => { this.props.fun(); }}>
                    <Text style={{ color: "#FFFFFF", fontSize: 20 }}>{this.props.value}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default MyButton2;
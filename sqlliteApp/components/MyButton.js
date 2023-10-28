import * as React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

class MyButton extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (
            <View style={{ backgroundColor: "#536DFE", borderRadius: 100, justifyContent: "center", width: 100, height: 100, alignItems: "center", bottom: 30, position: "absolute" }}>
                <TouchableOpacity onPress={() => { this.props.fun(); }}>
                    <Image
                        style={{ width: 50, height: 50 }}
                        source={require("./gfx/plus.png")}
                    ></Image>
                </TouchableOpacity>
            </View>
        );
    }
}
export { MyButton };
import * as React from 'react';
import { View, TouchableNativeFeedback, Text } from 'react-native';

class AlarmButton extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.x = this.props.r * Math.cos(-2 * Math.PI / 6 + (Math.PI / 6) * this.props.i) + this.props.offsetX; //left
        this.y = this.props.r * Math.sin(-2 * Math.PI / 6 + (Math.PI / 6) * this.props.i) + this.props.offsetY; //top
    }
    render() {
        return (
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
                onPress={() => this.props.toggle(this.props.value)}
                style={{
                    width: this.props.width,
                    height: this.props.height,
                    borderRadius: this.props.height
                }}
            >
                <View style={{ width: this.props.width, height: this.props.height, backgroundColor: this.props.background, borderRadius: this.props.height, alignItems: "center", justifyContent: "center", position: "absolute", left: this.x, top: this.y }}>
                    <Text style={{ fontSize: this.props.width / 2 }}>
                        {this.props.value}
                    </Text>
                </View>
            </TouchableNativeFeedback>
        );
    }
}
export { AlarmButton };
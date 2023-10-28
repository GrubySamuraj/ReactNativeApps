import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

class PhotoItem extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            isSelected: false
        }
        this.longPress = this.longPress.bind(this);
    }
    longPress() {
        let previous = this.state.isSelected
        this.setState({
            isSelected: !previous
        })
        this.props.longpress(this.props.id);
    }
    render() {
        return (
            <View style={{}}>
                <TouchableOpacity onPress={() => { this.props.press(this.props.photo, this.props.id) }} onLongPress={() => { this.longPress() }}>
                    <Image
                        style={{
                            width: this.props.width,
                            height: this.props.height,
                            margin: 1,
                            borderRadius: 15,
                            borderColor: "#F57C00",
                            borderWidth: 1
                        }}
                        source={{ uri: this.props.uri }}
                    />
                    <View style={{
                        position: "absolute",
                        backgroundColor: "#000000",
                        borderRadius: 15,
                        width: this.props.width,
                        height: this.props.height,
                        opacity: this.state.isSelected ? 0.6 : 0
                    }}>
                        <Image
                            style={{
                                position: "absolute",
                                backgroundColor: "#000000",
                                borderRadius: 15,
                                width: this.props.width,
                                height: this.props.height,
                                visibility: this.state.isSelected
                            }}
                            source={require("./gfx/plus.png")}
                        />
                    </View>
                    <Text style={styles.text1}>{this.props.id}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        position: "relative"
    },
    text1: {
        fontSize: 13,
        marginBottom: 20,
        position: "absolute",
        bottom: -10,
        color: "#fff",
        left: 25
    },
    text2: {
        fontSize: 30,
        textAlign: "center",
        color: "white"
    }
});
export default PhotoItem;
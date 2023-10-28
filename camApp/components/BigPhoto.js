import * as React from 'react';
import { View, Image, Text } from 'react-native';
import MyButton from './MyButton';
import * as Sharing from 'expo-sharing';


class BigPhoto extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.route.params.photo);
        this.share = this.share.bind(this);
        this.delete = this.delete.bind(this);
    }
    share() {
        Sharing.shareAsync(this.props.route.params.photo.uri);
    }
    delete() {
        this.props.route.params.navigation.navigate("s2");
        this.props.route.params.removePhoto(this.props.route.params.id);
    }
    render() {
        return (
            <View style={{ backgroundColor: "#FFE0B2", flex: 1 }}>
                <Image
                    style={{
                        flex: 3,
                        borderRadius: 15,
                        margin: 10
                    }}
                    source={{ uri: this.props.route.params.photo.uri }}
                />
                <View style={{
                    flex: 1,
                    justifyContent: "center"
                }}>
                    <Text style={{
                        textAlign: "center",
                        fontSize: 50,
                    }}>
                        {this.props.route.params.photo.width} x {this.props.route.params.photo.height}
                    </Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <MyButton value="share" fun={this.share} />
                    <MyButton value="delete" fun={this.delete} />
                </View>
            </View>
        );
    }
}
export default BigPhoto;
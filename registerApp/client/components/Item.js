import * as React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import MyButton2 from "./Button2";
import { ip, port } from "../Settings.json";
class Item extends React.Component {
    constructor(props) {
        super(props);
        console.log("item:");
        this.delete = this.delete.bind(this);
        this.details = this.details.bind(this);
    }
    delete() {
        fetch(`${ip}:${port}/delete`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.props.data.id
            })
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.status == "error") {
                    console.log(json);
                }
                else {
                    console.log(json);
                    this.props.setAllData(json);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    details() {
        fetch(`${ip}:${port}/details`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.props.data.id
            })
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.status == "error") {
                    console.log(json);
                }
                else {
                    console.log(json);
                    console.log(this.props);
                    this.props.GoToPageDetails("s3", json);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        return (
            <View style={{ margin: 10, justifyContent: "center", alignItems: "center" }}>
                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={require('./gfx/user.png')}
                    />
                    <MyButton2 fun={this.details} value="DETAILS" />
                    <MyButton2 fun={this.delete} value="DELETE" />
                </View>
                <View>
                    <Text style={{ fontSize: 30 }}>{this.props.data.id}:{this.props.data.username}</Text>
                </View>
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
        marginEnd: 50
    }
});
export default Item;
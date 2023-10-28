import * as React from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import MyButton2 from './Button2';
import { ip, port } from "../Settings.json";
class Screen1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.ButtonPress = this.ButtonPress.bind(this);
    }
    ButtonPress() {
        fetch(`${ip}:${port}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                if (json.status == "error") {
                    alert(json.message);
                }
                else {
                    this.props.navigation.navigate("s2", json);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <View style={{ flex: 1 }}>
                    <View style={styles.title.view}>
                        <Text style={styles.title.text}>
                            Register App
                        </Text>
                    </View>
                    <View style={styles.inputs.view}>
                        <Text style={styles.inputs.text}>
                            Welcome in app!
                        </Text>
                        <TextInput
                            underlineColorAndroid={"#E91E63"}
                            style={styles.inputs.input}
                            placeholder="enter username"
                            defaultValue={this.state.username}
                            onChangeText={newText => this.setState({ username: newText })}
                        />
                        <TextInput
                            underlineColorAndroid={"#E91E63"}
                            style={styles.inputs.input}
                            placeholder="enter password"
                            defaultValue={this.state.password}
                            onChangeText={newText => this.setState({ password: newText })}
                        />
                        <MyButton2 value="REGISTER" fun={this.ButtonPress} />
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
    title: {
        view: {
            flex: 1,
            backgroundColor: '#E91E63',
            justifyContent: "center",
        },
        text: {
            fontSize: 70,
            color: "#FFFFFF",
            textAlign: "center"
        }
    },
    inputs: {
        text: {
            fontSize: 25,
            textAlign: "center",
            padding: 20
        },
        view: {
            flex: 1,
            backgroundColor: "#F8BBD0",
            alignItems: "center"
        },
        input: {
            color: "#E91E63",
            height: 40,
            fontSize: 30,
            margin: 20,
            padding: 5
        }
    }
});
export default Screen1;
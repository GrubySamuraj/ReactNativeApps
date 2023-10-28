import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { ActivityIndicator } from 'react-native'; // okrągła animacja ładowania
import * as Font from "expo-font";

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            fontloaded: false
        }
        this.Press = this.Press.bind(this);
    }
    componentDidMount = async () => {
        await Font.loadAsync({
            'fajnaCzcionka': require('./font/go3v2.ttf'),
        });
        this.setState({ fontloaded: true })
    }
    Press() {
        this.props.navigation.navigate("s2");
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar />
                <TouchableOpacity onPress={this.Press}>
                    {this.state.fontloaded
                        ?
                        <Text style={{ fontFamily: "fajnaCzcionka", textAlign: "center", fontSize: 70, color: "white" }}>Geo App</Text>
                        :
                        null}
                </TouchableOpacity>
                <Text style={styles.text2}>find and save your position, use google maps</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#7B1FA2",
    },
    text1: {
        fontSize: 60,
        textAlign: "center",
        marginBottom: 20
    },
    text2: {
        fontSize: 30,
        textAlign: "center",
        color: "white"
    }
});
export default Main;
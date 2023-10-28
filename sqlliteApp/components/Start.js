import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import * as Font from "expo-font";
import { Database } from './Database';

class Start extends React.Component {
    constructor() {
        super();
        this.state = {
            fontloaded: false,
            backGroundstatus: false
        }
        this.Press = this.Press.bind(this);
        this.task = 'MyAlarm';
    }
    componentDidMount = async () => {
        await Font.loadAsync({
            'fajnaCzcionka': require('./font/go3v2.ttf'),
        });
        this.setState({ fontloaded: true })
        Database.createTable();
        // await this.requestPermissions();
    }
    // async requestPermissions() {
    //     const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
    // }
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
                        <Text style={{ fontFamily: "fajnaCzcionka", textAlign: "center", fontSize: 70, color: "white" }}>Sqlite App</Text>
                        :
                        null}
                </TouchableOpacity>
                <Text style={styles.text2}>manage sqlite</Text>
                <Text style={styles.text2}>use animation</Text>
                <Text style={styles.text2}>use ring</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#5D4037",
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
export { Start };
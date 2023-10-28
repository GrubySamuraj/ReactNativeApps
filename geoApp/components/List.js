import React from 'react';
import { StyleSheet, Switch, View, StatusBar, FlatList, Alert } from 'react-native';
import MyButton from './MyButton';
import { AsyncStorage } from 'react-native';
import Item from "./Item";
import { ActivityIndicator } from 'react-native'; // okrągła animacja ładowania
import * as Font from "expo-font";
import * as Location from "expo-location";

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            isEnabled: false,
            maps: [],
            toMap: []
        }
        this.toggleSwitch = this.toggleSwitch.bind(this);
        this.getPosition = this.getPosition.bind(this);
        this.setData = this.setData.bind(this);
        this.getAllData = this.getAllData.bind(this);
        this.SetMap = this.SetMap.bind(this);
        this.deletePostions = this.deletePostions.bind(this);
        this.toggleSwitchChild = this.toggleSwitchChild.bind(this);
    }
    deletePostions = async () => {
        await AsyncStorage.removeItem("map1");
        this.setState({
            maps: []
        })
        alert("Dane usunięte");
    }
    componentDidMount = async () => {
        await Location.requestForegroundPermissionsAsync();
    }
    getPosition = async () => {
        let pos = await Location.getCurrentPositionAsync({})
        Alert.alert("alert", "Pozycja została pobrana, czy zapisać?",
            [
                {
                    text: "Cancel",
                    onPress: () => { console.log("anulowano") },
                    style: "cancel"
                },
                {
                    text: "OK", onPress: async () => {
                        console.log("aaaa");
                        this.setState({
                            maps: [...this.state.maps, pos]
                        })
                        await this.setData(this.state.maps);
                    }
                }
            ]);
    }
    setData = async (maps) => {
        for (let x = 0; x < maps.length; x++) {
            maps[x].id = x;
            maps[x].isEnabled = false;
        }
        await AsyncStorage.setItem('map1', JSON.stringify(maps));
    }
    toggleSwitchChild(id, isEnabled) {
        let toMap = this.state.toMap;
        let maps = this.state.maps;
        if (!isEnabled) {
            toMap.push(this.state.maps[id]);
            maps[id].isEnabled = true;
        }
        else {
            for (let x = 0; x < toMap.length; x++) {
                if (toMap[x].id === id) {
                    toMap.splice(x, 1);
                }
            }
            maps[id].isEnabled = false;
        }
        this.setState({
            toMap: toMap,
            maps: maps
        });
        console.log(this.state.maps);
    }
    getAllData = async () => {
        let val = JSON.parse(await AsyncStorage.getItem('map1'));
        this.setState({
            maps: val,
        });
    }
    toggleSwitch() {
        let prevState = this.state.isEnabled;
        let maps = this.state.maps;
        for (let x = 0; x < maps.length; x++) {
            maps[x].isEnabled = !prevState;
        }
        if (!this.state.isEnabled) {
            this.setState({
                isEnabled: !prevState,
                maps: maps,
                toMap: this.state.maps
            });
        }
        else {
            this.setState({
                isEnabled: !prevState,
                maps: maps,
                toMap: []
            });
        }
    }
    SetMap() {
        if (this.state.toMap.length > 0) {
            this.props.navigation.navigate("s3", { data: this.state.toMap });
        }
        else {
            alert("Proszę wybrać co najmniej jedną mapkę!");
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar />
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <MyButton value="Pobierz i zapisz pozycję" fun={this.getPosition} />
                    <MyButton value="Usuń wszystkie dane" fun={this.deletePostions} />
                </View>
                <View style={{ flexDirection: "row" }}>
                    <MyButton value="Przejdź do mapy" fun={this.SetMap} />
                    <Switch
                        style={{ marginLeft: 30 }}
                        trackColor={{ false: "#767577", true: "#E1BEE7" }}
                        thumbColor={this.state.isEnabled ? "#9C27B0" : "#f4f3f4"}
                        onValueChange={this.toggleSwitch}
                        value={this.state.isEnabled}
                    />
                </View>
                <FlatList
                    data={
                        this.state.maps
                    }
                    renderItem={({ item }) => <Item data={item} toggleSwitch={this.toggleSwitchChild} bigSwitch={this.state.isEnabled} />}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
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
export default List;
import * as React from 'react';
import { View, Text, Switch, StyleSheet, TouchableNativeFeedback, Image, Animated, Vibration } from 'react-native';
import { Database } from './Database';
import { Audio } from 'expo-av';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMusic: false,
            isVibration: false,
            height: new Animated.Value(0),
            expanded: false, // zwinięty,
            days: [
                {
                    value: "PN",
                    isClicked: false
                },
                {
                    value: "WT",
                    isClicked: false
                },
                {
                    value: "ŚR",
                    isClicked: false
                },
                {
                    value: "CZ",
                    isClicked: false
                },
                {
                    value: "PT",
                    isClicked: false
                },
                {
                    value: "SB",
                    isClicked: false
                },
                {
                    value: "ND",
                    isClicked: false
                }],
            sound: "",
            status: null,
            isRegistered: false
        }
        this.pattern = [
            1 * 10,
            3 * 1000,
            1 * 10,
        ]
        this.toValue = 100;
        this.onSwitchMusic = this.onSwitchMusic.bind(this);
        this.onSwitchVibration = this.onSwitchVibration.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleDay = this.toggleDay.bind(this);
        this.remove = this.remove.bind(this);
    }
    onSwitchMusic() {
        let isEnabled = this.state.isMusic;
        this.setState({
            isMusic: !isEnabled
        });
    }
    onSwitchVibration() {
        let isEnabled = this.state.isVibration;
        this.setState({
            isVibration: !isEnabled
        })
    }
    async componentDidMount() {
        let sound = await Audio.Sound.createAsync(require('./music/rajd.mp3'));
        this.setState({
            sound: sound
        })
        await this.PlayAlarm();
        await this.checkStatus();
    }

    async PlayAlarm() {
        this.interwal = setInterval(async () => {
            let hours = new Date().getHours();
            let minutes = new Date().getMinutes();
            if (this.state.isVibration) {
                if (hours == this.props.data.time.split(":")[0] && minutes == this.props.data.time.split(":")[1]) {
                    Vibration.vibrate(this.pattern, true);
                }
                else {
                    Vibration.cancel();
                }
            }
            else {
                Vibration.cancel();
            }
            if (this.state.isMusic) {
                if (hours == this.props.data.time.split(":")[0] && minutes == this.props.data.time.split(":")[1]) {
                    let sound2 = this.state.sound;
                    if (!sound2.sound._loaded) {
                        let sound = await Audio.Sound.createAsync(require('./music/rajd.mp3'));
                        this.setState({
                            sound: sound
                        })
                    }
                    await sound2.sound.playAsync();
                }
            }
            else {
                let sound2 = this.state.sound;
                if (sound2.sound._loaded) {
                    await sound2.sound.unloadAsync();
                }
            }
        }, 1000);
    }
    toggle() {
        if (!this.state.expanded) this.toValue = 100
        else this.toValue = 50
        Animated.spring(this.state.height, {
            toValue: this.toValue,
            useNativeDriver: false,
        }).start();
        let expanded = this.state.expanded;
        this.setState({
            expanded: !expanded
        });
    }
    toggleDay(day) {
        for (let x = 0; x < this.state.days.length; x++) {
            if (this.state.days[x].value === day) {
                let days = this.state.days;
                if (days[x].isClicked) {
                    days[x].isClicked = false;
                    this.setState({
                        days: days,
                    });
                }
                else {
                    days[x].isClicked = true;
                    this.setState({
                        days: days,
                    })
                }
            }
        }
    }
    remove() {
        this.props.remove(this.props.data.id, this.state.days);
    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: "column" }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ flexDirection: "column", marginRight: 100 }}>
                        <Text style={styles.text}>{this.props.data.time}</Text>
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
                            onPress={() => this.remove()}
                            style={{
                                width: 100,
                                height: 100,
                            }}
                        >
                            <View style={{ width: 50, height: 50 }}>
                                <Image
                                    style={{ width: 30, height: 30, left: 10, top: 10 }}
                                    source={require("./gfx/delete.png")}
                                >
                                </Image>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={{ flexDirection: "column" }}>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={this.state.isVibration ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={this.onSwitchVibration}
                            value={this.state.isVibration}
                            style={{
                                marginTop: 20
                            }}
                        />
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={this.state.isMusic ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={this.onSwitchMusic}
                            value={this.state.isMusic}
                            style={{
                                marginTop: 20
                            }}
                        />
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
                            onPress={() => this.toggle()}
                            style={{
                                width: 100,
                                height: 100,
                            }}
                        >

                            <View style={{ width: 50, height: 50 }}>
                                <Image
                                    style={{ width: 30, height: 30, left: 10, top: 10, transform: this.state.expanded ? [{ rotate: '180deg' }] : [{ rotate: '0deg' }] }}
                                    source={require("./gfx/expand.png")}
                                >

                                </Image>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
                <Animated.View style={{
                    height: this.state.height, // animowany styl, tutaj wysokość View
                    flexDirection: "row",
                }} >
                    {
                        this.state.expanded ?
                            this.state.days.map((item, i) => {
                                return (
                                    <TouchableNativeFeedback
                                        key={i}
                                        background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
                                        onPress={() => this.toggleDay(item.value)}
                                        style={{
                                            width: 50,
                                            height: 50,
                                            justifyContent: "center",
                                        }}
                                    >
                                        <View
                                            key={i}
                                            style={{
                                                width: 50,
                                                height: 50,
                                                justifyContent: "center",
                                                borderRadius: 50,
                                                backgroundColor: item.isClicked ? 'rgba(128,128,128,1)' : 'rgba(128,128,128,0)',

                                            }}>
                                            <Text
                                                key={i}
                                                style={{
                                                    textAlign: "center",
                                                    color: "white",
                                                    zIndex: 2
                                                }}>{item.value}
                                            </Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                )
                            })
                            :
                            this.state.days.map((item, i) => {
                                return (
                                    <View key={i}>
                                        {item.isClicked ? <Text>{item.value},</Text> : null}
                                    </View>
                                )
                            })
                    }
                </Animated.View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "left",
        backgroundColor: "#795548",
    },
    text: {
        color: "white",
        fontSize: 70
    }
});
export { ListItem };
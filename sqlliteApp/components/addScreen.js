import { StyleSheet, Text, TouchableNativeFeedback, View, Vibration } from 'react-native';
import { MyButton } from './MyButton';
import { Database } from './Database';
import { AlarmButton } from './AlarmButton';
import * as React from 'react';
class AddScreen extends React.Component {
    constructor(props) {
        super(props);
        this.hours = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        this.hours2 = ["13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "00"]
        this.minutes = ["05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "00"]
        this.state = {
            hours: "00",
            minutes: "00",
            isHoursVisible: true
        }
        this.toggleHours = this.toggleHours.bind(this);
        this.toggleMinutes = this.toggleMinutes.bind(this);
        this.clickHours = this.clickHours.bind(this);
        this.clickMinutes = this.clickMinutes.bind(this);
        this.addAlarm = this.addAlarm.bind(this);
        this.ONE_SECOND_IN_MS = 1000;
        this.patern = [
            1 * 50,
            2 * 50,
            3 * 50
        ];
    }
    addAlarm() {
        let weekDays = [
            {
                name: "Pn",
                val: false
            },
            {
                name: "Wt",
                val: false
            },
            {
                name: "Śr",
                val: false
            },
            {
                name: "Cz",
                val: false
            },
            {
                name: "Pt",
                val: false
            },
            {
                name: "Sb",
                val: false
            },
            {
                name: "Nd",
                val: false
            }
        ]
        Database.addAlarm(`${this.state.hours}:${this.state.minutes}`, JSON.stringify(weekDays));
        Database.getAllAlarms();
    }
    clickHours() {
        this.setState({
            isHoursVisible: true
        });
        Vibration.vibrate(this.patern)
    }
    clickMinutes() {
        this.setState({
            isHoursVisible: false
        })
        Vibration.vibrate(this.patern)
    }
    toggleHours(value) {
        this.setState({
            hours: value
        })
        Vibration.vibrate(this.patern)
    }
    toggleMinutes(val) {
        let value = parseInt(val)
        let minutes = parseInt(this.state.minutes);
        console.log(value);
        console.log(minutes);
        if (minutes === value) {
            minutes += 1;
        }
        else if (minutes === value + 1) {
            minutes += 1;
        }
        else if (minutes === value + 2) {
            minutes += 1;
        }
        else if (minutes === value + 3) {
            minutes += 1;
        }
        else {
            minutes = val
        }
        if (minutes.toString().length === 1) {
            let minutes2 = minutes.toString().split("")
            minutes2.unshift("0")
            minutes = minutes2.join("");
        }
        this.setState({
            minutes: minutes.toString()
        })
        Vibration.vibrate(this.patern)
    }
    render() {
        return (
            <View style={styles.container} >
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
                        onPress={() => this.clickHours()}
                        style={{
                            width: 100,
                            height: 100,
                        }}
                    >
                        <View style={{ width: 100, height: 100 }}>
                            <Text style={styles.text1}>
                                {this.state.hours}
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                    <Text style={styles.text1}>
                        :
                    </Text>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
                        onPress={() => this.clickMinutes()}
                        style={{
                            width: 100,
                            height: 100,
                        }}
                    >
                        <View style={{ width: 100, height: 100 }}>
                            <Text style={styles.text1}>
                                {this.state.minutes}
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={{ flex: 2, justifyContent: "center" }}>
                    {this.state.isHoursVisible ?
                        this.hours.map((item, i) => {
                            return (
                                <AlarmButton key={item} value={item} height={50} width={50} r={150} background={"#FFFFFF"} i={i} offsetX={-25} offsetY={80} toggle={this.toggleHours} />
                            )
                        })
                        :
                        this.minutes.map((item, i) => {
                            return (
                                <AlarmButton key={i + 20} value={item} height={50} width={50} r={150} background={"#FFFFFF"} i={i} offsetX={-25} offsetY={80} toggle={this.toggleMinutes} />
                            )
                        })
                    }
                    {this.state.isHoursVisible ?
                        this.hours2.map((item, i) => {
                            return (
                                <AlarmButton key={item} value={item} height={30} width={30} r={80} background={"#DDDDDD"} i={i} offsetX={-15} offsetY={85} toggle={this.toggleHours} />
                            )
                        })
                        : null
                    }

                </View>
                <MyButton fun={this.addAlarm} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#795548",
        flexDirection: "column",
    },
    text1: {
        fontSize: 60,
        textAlign: "center",
        color: "white",
        justifyContent: "center"
    }
});
export { AddScreen };
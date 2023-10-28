import { StyleSheet, View, ScrollView } from 'react-native';
import { MyButton } from "./MyButton";
import { ListItems } from "./ListItems";
import { Database } from "./Database";
import * as React from 'react';
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
        this.addAlarm = this.addAlarm.bind(this);
        this.removeAlarm = this.removeAlarm.bind(this);
    }
    async componentDidMount() {
        let data = await Database.getAllAlarms();
        console.log(data);
        this.setState({
            data: data
        })
        this.props.navigation.addListener('focus', async () => {
            let data = await Database.getAllAlarms();
            console.log(data);
            this.setState({
                data: data
            })
        })
    }
    removeAlarm(id, selected) {
        console.log("id: ", id);
        let data = this.state.data;
        for (let x = 0; x < data.length; x++) {
            if (data[x].id === id) {
                console.log(data[x]);
                data.splice(x, 1);
            }
        }
        this.setState({
            data: data
        });
        Database.remove(id);
        console.log(selected);
    }
    addAlarm() {
        this.props.navigation.navigate("alarms", this.addData);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.alarms}>
                    <ScrollView>
                        <ListItems data={this.state.data} remove={this.removeAlarm} />
                    </ScrollView>
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
        backgroundColor: "#795548",
    },
    alarms: {
        flex: 5,
    },
});
export { Main }
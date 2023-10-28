import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MyButton2 from "./Button2";
import Item from "./Item";
class Screen2 extends React.Component {
    constructor(props) {
        super(props);
        this.goToPage2 = this.goToPage2.bind(this);
        this.state = { data: this.props.route.params };
        this.setAllData = this.setAllData.bind(this);
        this.GoToPageDetails = this.GoToPageDetails.bind(this);
    }
    goToPage2() {
        this.props.navigation.navigate("s1");
    }
    setAllData(json) {
        this.setState({
            data: json
        });
    }
    GoToPageDetails(page, data) {
        this.props.navigation.navigate(page, data);
    }
    render() {
        return (
            <View>
                <MyButton2 fun={this.goToPage2} value="Back to login page" navigation={this.props.navigation} />
                <FlatList
                    contentContainerStyle={{ paddingBottom: 40 }}
                    data={
                        this.state.data
                    }
                    renderItem={({ item, id }) => <Item key={id} data={item} setAllData={this.setAllData} GoToPageDetails={this.GoToPageDetails} />}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    }
});
export default Screen2;
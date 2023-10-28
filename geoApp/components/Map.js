import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';

class Map extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.route.params.data);
    }
    render() {
        return (
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: this.props.route.params.data[0].coords.latitude,
                    longitude: this.props.route.params.data[0].coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}
            >
                {this.props.route.params.data.map((item, i) => {
                    return (
                        <Marker
                            key={i}
                            coordinate={{
                                latitude: item.coords.latitude,
                                longitude: item.coords.longitude,
                            }}
                            title={"pos " + i}
                            description={"opis"}
                        />
                    )
                })}
            </MapView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        color: "#7B1FA2",
        textAlign: "left",
        fontWeight: "500",
        fontSize: 18
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 50
    }
});
export default Map;
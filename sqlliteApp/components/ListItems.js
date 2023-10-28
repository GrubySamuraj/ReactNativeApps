import * as React from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from "./ListItem";

class ListItems extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (
            <View>
                {this.props.data.map((item, i) => {
                    return <ListItem key={item.id} data={item} remove={this.props.remove} />
                })}
            </View>
        )
    }
}
export { ListItems };
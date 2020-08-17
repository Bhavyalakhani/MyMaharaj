import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class TrackOrder extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>TrackOrder</Text>
            </View>
        );
    }
}
export default TrackOrder;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
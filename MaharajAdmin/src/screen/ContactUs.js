import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class ContactUs extends Component {
    render() {
        return (
            <View style={styles.container}>
            <Text style={{fontSize:30 , paddingTop:10}}>Contact Us </Text>
            <Text style={{fontSize:30}}>random123@gmail.com</Text>
            </View>
        );
    }
}
export default ContactUs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
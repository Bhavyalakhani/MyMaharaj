import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";

export default class RegisterAdmin extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{alignSelf:'center' , backgroundColor:'#000' ,  borderRadius:10}} onPress = {() => {this.props.navigation.navigate('Registration',{'admin':'admin'})}}>
                    <Text style = {styles.button}>Register for Maharaj</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button:{
        fontSize:25,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        margin:10,
        paddingRight:10 ,
        color:'white' 
        
    } , 
});
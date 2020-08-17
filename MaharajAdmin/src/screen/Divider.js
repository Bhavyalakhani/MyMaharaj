import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";

class Divider extends Component {
    render() {
        return (
            <View style={style.container}>
                <TouchableOpacity style={{alignSelf:'center' , backgroundColor:'#000' , marginTop:30 , borderRadius:10}} onPress = {() => this.props.navigation.navigate('AdminLogin')}>
                    <Text style = {style.button}>AdminLogin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignSelf:'center' , backgroundColor:'#000' , marginTop:30 , borderRadius:10}} onPress = {() => this.props.navigation.navigate('MaharajLogin')}>
                    <Text style = {style.button}>MaharajLogin</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default Divider;

const style = StyleSheet.create({
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
    }
});
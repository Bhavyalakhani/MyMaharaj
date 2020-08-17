import React from 'react';
import { Text, StyleSheet, ImageBackground , Image, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { color } from 'react-native-reanimated';

export default class SplashScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isloading:true,
            is_authenticated:false 
        }
    }

    async componentDidMount(){
        let token = await AsyncStorage.getItem('token')
        console.log(token)
        if(token){
            this.setState({is_authenticated:true})
            this.props.navigation.navigate('Main')
        }
        else{
            this.props.navigation.navigate('LoginScreen')
        }
    }

render(){
    if(this.state.isloading){
    return(
        <View style = {style.container}>
            <Text style = {style.text}>Welcome to MY MAHARAJA</Text>
        </View>
)
    }
}
}
const style = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        backgroundColor:'black'
    },

    text:{
        fontSize:50,
        textAlign:'center',
        color:'white'
    }
})

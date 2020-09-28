import React from 'react';
import { Text, StyleSheet, ImageBackground , Image, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { color } from 'react-native-reanimated';

export default class SplashScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isloading:true,
        }
    }

    async componentDidMount(){
        let token = await AsyncStorage.getItem('token')
        let Admintoken = await AsyncStorage.getItem('Admintoken')
        console.log(token)
        if(token || Admintoken){
            if(token){
            this.setState({is_authenticated:true})
            setTimeout( () => this.props.navigation.navigate('MainMaharaj'),1500)
            }
            else{
                this.setState({is_authenticated:true})
                setTimeout(() =>  this.props.navigation.navigate('MainAdmin'),1500)
            }
        }
        else{
            setTimeout(() => this.props.navigation.navigate('Divider') , 1500)
        }
    }

render(){
    if(this.state.isloading){
    return(
        <View style = {style.container}>
            <Image source ={require('../images/hat.png')} style ={{height:140 , width:200 , alignSelf:"center"}}/>
            <Text style = {style.text}>MY MAHARAJA</Text>
        </View>
)
    }
}
}
const style = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
    },

    text:{
        fontSize:45,
        textAlign:'center',
    }
})

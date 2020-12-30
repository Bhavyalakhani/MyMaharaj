import React from 'react';
import { Text, StyleSheet, ImageBackground , Image, View,TouchableOpacity,Share} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage"
import Icon from "react-native-vector-icons/FontAwesome5"

export default class Settings extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            data : {},
        }
    }
    componentDidMount= async() =>{
        let token = await AsyncStorage.getItem('token')
            console.log(token)
            fetch('https://maharaj-3.herokuapp.com/api/v1/auth/me',
            {
                method:'PUT',
                headers:{
                    "Authorization":token,
                    "Content-Type":"application/json"
                }
            }, ).then((response) => 
                response.json()
            
        ).then((data) =>{
            console.log(data)
            this.setState({data : data})
        })
    }
    logout = async () => {
        console.log(AsyncStorage.getItem('token'))
        await AsyncStorage.removeItem('token').then((data) =>{console.log(data)})
        this.props.navigation.navigate('LoginScreen')
    }

    shareapp = () => {
        Share.share({
            message:'my maharaj app https://www.google.com/',
            url:'https://www.google.com/',
            title:'wow did you see that'
        },{
            dialogTitle:'share our app'
        }
        )
    }

render(){
    return(
        <View style = {style.container}>
                <View style={style.infoContainer}>
                    <Text style={[style.text, { fontWeight: "200", fontSize: 36 }]}>{this.state.data.name}</Text>
                    <Text style={[style.text3, { color: "#ababab", fontSize: 14 }]}>{this.state.data.email}</Text>
                    <Text style={[style.text3, { color: "#ababab", fontSize: 14 }]}>{this.state.data.mobile}</Text>
                </View>
                <TouchableOpacity style={style.tab} onPress={() =>{this.props.navigation.navigate('FAQ')}} >
                    <Text style={style.text}>FAQS</Text>
                    <Icon name="chevron-right" size={20}  color='#aaaaaa'/>
                </TouchableOpacity>
               
                <TouchableOpacity style={style.tab} onPress={() => {this.props.navigation.navigate('ContactUs')}}>  
                        <Text style={style.text}>ContactUs</Text>
                        <Icon name="phone" size={20} color='#aaaaaa'  />
                </TouchableOpacity>
                <TouchableOpacity style={style.tab} onPress={() => {this.shareapp()}}>  
                        <Text style={style.text}>Share MyMaharaj</Text>
                        <Icon name="share" size={20} color="#aaaaaa"  />
                
                </TouchableOpacity>
                <TouchableOpacity style={style.tab}  onPress={() => this.logout()}>  
                        <Text style={style.text}>Logout</Text>
                        <Icon name="sign-out-alt" size={20} color='#aaaaaa' />
                
                </TouchableOpacity>
            <Text style={style.Company}>
                MyMaharaj
            </Text>
        </View>
)}
}
const style = StyleSheet.create({
    container: {
        marginTop:10,
        flex:1,
    },

    text2:{
        color:'black',
        fontSize:20,
        fontWeight:"400"
    

    },
    tab : {
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:"#ababab"
    },
    Company :{
        alignSelf:'center',
        marginTop:300,
        marginBottom:20,
        fontWeight:"400",
        fontSize:25,
    },
    infoContainer: {
        alignItems: "center",
        marginTop: 10,
        paddingBottom:10,
        borderBottomWidth:1,
        borderBottomColor:"#ababab"
    },
    text3: {
        fontSize:16,
        fontFamily: 'SpaceMono-Regular',
        color: '#ababab'
    }
})

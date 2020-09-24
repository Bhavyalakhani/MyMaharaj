import React from 'react';
import { Text, StyleSheet, ImageBackground , Image, View , TextInput , TouchableOpacity,LayoutAnimation,UIManager, Alert,ToastAndroid} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage"

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

export default class LoginScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            OTP : true,
            token:'',
            mobile:'',
            OTP_value:''


        }
    }
    sendotp =async ()=>{                                                                //fetching the send sms api and handling with errors 
        if(this.state.mobile){
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            this.setState({OTP:false})
             await fetch("https://maharaj-3.herokuapp.com/api/v1/maharajAuth/sms",
             {
                 method:"POST",
                 headers:{
                    "Content-Type": "application/json"
                 },
                 body : JSON.stringify({
                     mobile : this.state.mobile
                 })
                    
            })
            .catch((error) => {
                Alert.alert(error)
            })
         }
        else{
            Alert.alert("Please enter your mobile no")
         }

    }
    verifyotp = async () =>{                         //verifying your otp and handling errors 
        if(this.state.OTP_value){
         await fetch("https://maharaj-3.herokuapp.com/api/v1/maharajAuth/verify",{
                method:"POST",
                body:JSON.stringify({
                    token:this.state.OTP_value,
                    mobile:this.state.mobile
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then((response) => response.json())
            .then((data) =>{
                if(data.message=='Token is valid.'){
                console.log(data.token)
                this.setState({token:data.token})
                x=this.props.navigation.getParam('admin')
                if(x=='admin'){
                    ToastAndroid.showWithGravity('Registered Successfully',2000,ToastAndroid.CENTER)
                    this.props.navigation.navigate('RegisterAdmin')
                }
                else{
                    this.props.navigation.navigate('MaharajLogin')
                    console.warn(this.state.token)
                }
                }
                else{
                    Alert.alert('Wrong OTP')
                }
            })
            .catch((error) =>{
                Alert.alert(error)
            });

        }
        else{
            Alert.alert("Please enter the OTP")

        }
    }
 
render(){
    return(
        <View style = {style.container}>
            <Text style = {{fontSize:40 , alignItems:'center' , alignSelf:'center' , fontWeight:'bold' , marginTop:100 , marginBottom:100,alignContent:'center'}}>Enter your Number to verify your credentials</Text>
            
            <View style = {{flexDirection:'row' ,  borderWidth:1 , marginLeft:50, marginRight:50 , borderColor:'grey' , borderRadius:10}}>
            <Text style={style.text}>+91</Text>
            <TextInput
              keyboardType = {'numeric'}
              placeholder = 'Phone Number'
              onChangeText={(text) => this.setState({mobile:text})}
              style={style.textinput}

            >
            </TextInput>
            </View>
        { this.state.OTP ? 
        <View>
            <TouchableOpacity style={{alignSelf:'center' , backgroundColor:'#000' , marginTop:30 , borderRadius:10}} onPress = {() => this.sendotp()}>
                <Text style = {style.button}>Send OTP</Text>
            </TouchableOpacity>
        </View>
            :
            <View>
            <View style = {{  borderWidth:1 , marginLeft:50, marginRight:50 , borderColor:'grey' , borderRadius:10 , marginTop:40}}>
            <TextInput
              keyboardType = {'numeric'}
              placeholder = 'OTP'
              onChangeText={(text) => {this.setState({OTP_value:text})}}
              style={style.textinput}
            >
            </TextInput> 
            </View>
            <TouchableOpacity style={{alignSelf:'center' , backgroundColor:'#000' , marginTop:30 , borderRadius:10}} onPress = {() => {this.sendotp()}}>
            <Text style = {style.button}>Resend OTP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf:'center' , backgroundColor:'#000' , marginTop:30 , borderRadius:10}} onPress = {() => {this.verifyotp()}}>
            <Text style = {style.button}>Confirm OTP</Text>
            </TouchableOpacity>
            </View>
        }
        </View>
)}
}
const style = StyleSheet.create({
    container: {
        flex:1,        
    },

    text:{
        fontSize:25,
        borderRightWidth:1,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        margin:10,
        paddingRight:10 , 
        borderColor:'grey'
    } , 
    textinput:{
        fontSize:25,
        paddingLeft:10,
        
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
})

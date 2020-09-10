import React,{useState, Component} from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert,
    ToastAndroid
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import  AsyncStorage from "@react-native-community/async-storage"

export default class Registration extends Component {

constructor(){
    super();
        this.state={
            username: "",
            email:" ",
            password: " ",
            confirm_password: "",
            secureTextEntry: true,
            confirm_secureTextEntry: true,
            mobile:"",
            city:"",
            country_code:"",
            role:'user',
            token:" "
        }
    }



    

     updateSecureTextEntry = () => {
        this.setState({
            secureTextEntry: !this.state.secureTextEntry
        });
    }

     updateConfirmSecureTextEntry = () => {
        this.setState({
            confirm_secureTextEntry: !this.state.confirm_secureTextEntry
        });
    }
      signup =  () => {
        var letters = /^[A-Za-z]+$/;
        var numbers = /^[0-9]+$/;
          if(this.state.username && this.state.email){
             if(this.state.password==this.state.confirm_password && this.state.password.length>4){
                 if(this.state.mobile.length==10 && this.state.mobile.match(numbers)){
                     if(this.state.city.match(letters)){
                    ToastAndroid.showWithGravity(
                        "Registering",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                      );
                   fetch('https://maharaj-3.herokuapp.com/api/v1/auth/register',{
                    method:"POST",
                    body:JSON.stringify({
                        name:this.state.username,
                        email:this.state.email,
                        password:this.state.password,
                        mobile:this.state.mobile,
                        countryCode:"91",
                        city:this.state.city,
                        role:"user"                       
                    }),
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                .then((response) => response.json())
                .then((data) =>{

                    if(data.success){
                        this.props.navigation.navigate('Verify')
                    }
                    else{                        
                        Alert.alert('Email or Phone number taken')
                    }
            })
            .catch((error) =>{
                console.log(error)
//                this.props.navigation.navigate('Verify')
            })
        }
        else{
            Alert.alert("Enter an appropriate City Name")
        }
    }
        else{
            Alert.alert('Not a valid Number')
        }
            }
            else{
                Alert.alert("Passwords dont match or length of the password is less than 4")
            }
        }
        else{
            Alert.alert('Username or Email missing')
        }
    }
    render(){
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='black' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.text_footer}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Username"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => {this.setState({username:val})}}
                />
            </View>
            <Text style={[styles.text_footer,{marginTop:35}]}>Email Id</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your email"
                    style={styles.textInput}
                    autoCapitalize="none"
                    keyboardType = {"email-address"}
                    onChangeText={(val) => {this.setState({email:val})}}
                />
            </View>
            <Text style={[styles.text_footer,{marginTop:35}]}>Phone</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="phone"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Code"
                    style={styles.textInput}
                    autoCapitalize="none"
                    keyboardType={"phone-pad"}
                    onChangeText={(val) => {this.setState({country_code:val})}}
                    editable={false}
                >+91</TextInput>
                <Text>-</Text>
                <TextInput 
                    placeholder="Your Mobile_No"
                    style={styles.textInput}
                    keyboardType={"phone-pad"}
                    autoCapitalize="none"
                    onChangeText={(val) => {this.setState({mobile:val})}}
                ></TextInput>
            </View>
            <Text style={[styles.text_footer,{marginTop:35}]}>City</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="building"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="City"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => {this.setState({city:val})}}
                />
            </View>

            

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={this.state.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => {this.setState({password:val})}}
                />
                <TouchableOpacity
                    onPress={this.updateSecureTextEntry}
                >
                    {this.state.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Confirm Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Confirm Your Password"
                    secureTextEntry={this.state.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => {this.setState({confirm_password:val})}}
                />
                <TouchableOpacity
                    onPress={this.updateConfirmSecureTextEntry}
                >
                    {this.state.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {this.signup()}}
                >
                <LinearGradient
                    colors={['black', 'black']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'white'
                    }]}>Register</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('LoginScreen')}
                    style={[styles.signIn, {
                        borderColor: 'black',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: 'black'
                    }]}>Already have an account?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Verify')}
                    style={[styles.signIn, {
                        borderColor: 'black',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: 'black'
                    }]}>Verify if already Registered</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
}
};


const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: 'black'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'android' ? 5 : 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
        marginRight:20
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    textInput1:{
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        color: '#05375a',
        width:100,
        marginHorizontal:100
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
  });
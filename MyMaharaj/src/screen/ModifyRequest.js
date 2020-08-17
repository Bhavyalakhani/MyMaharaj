import React from 'react';
import { Text, StyleSheet, ImageBackground, Image, View, TextInput, TouchableOpacity ,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-community/async-storage'
import { ThemeColors } from 'react-navigation';

export default class ModifyRequest extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            type_of_booking : '',
            Cuisine:'',
            isVisible : false,
            date : null ,
            location:'',
            longLat:{},
            date:'',
            time:'',
            bookingQuantity:0,
            enable:true,
            type_of_meal:'',
            priceLow:'',
            priceMax:'',
            Flat_no:'',
            Wing:'',
            item:'',
            id:'',
            picked:false
        }
    }
    componentDidMount() {
        const item = this.props.navigation.getParam('item')
        console.log(item)
        this.setState({
            date : item.bookingDate,
            time: item.bookingTime,
            type_of_booking : item.bookingType,
            bookingQuantity : item.bookingQuantity,
            foodType : item.foodType,
            Cuisine : item.cuisine , 
            priceLow: item.priceLow,
            priceMax: item.priceMax,
            location: item.address,
            id : item._id
        })
    }

    Input = () =>{
        if(this.state.type_of_booking === 'Hourly'){
            return (
                <View style={{marginHorizontal:30 , marginTop:15 }}>
                    <TextInput
                        keyboardType={'numeric'}
                        placeholder='Enter Number of hours'
                        onChangeText={(text) => this.setState({
                            bookingQuantity:text,
                            priceLow:350*parseFloat(text) - 50,
                            priceMax:350*parseFloat(text),
                        })}
                        style={style.textinput}
                    ></TextInput>
                </View>
            )
        }
        else if(this.state.type_of_booking === 'Number of days'){
            return (
                <View style={{marginHorizontal:30 , marginTop:10 }}>
                <TextInput
                keyboardType={'numeric'}
                        placeholder='Enter Number of days'
                        onChangeText={(text) => this.setState({
                            bookingQuantity:text,
                            priceLow:700*parseFloat(text) - 50,
                            priceMax:700*parseFloat(text),
                        })}
                        style={style.textinput}
                ></TextInput>
                </View>
            )
        }
        else{
            return null
        }
         
    }
    sendRequest = async() =>{
        let token = await AsyncStorage.getItem('token')
        console.log(token)
        fetch('https://maharaj-3.herokuapp.com/api/v1/req/modify/'+this.state.id,
        {
            method:"PUT",
            headers:{
                "Authorization":token,
                "Content-Type":"application/json                "
            },
            body:JSON.stringify({
                "bookingType": this.state.type_of_booking,
                "bookingQuantity": this.state.bookingQuantity,
                "priceLow": this.state.priceLow,
                "priceMax": this.state.priceMax,
                "bookingDate": this.state.date,
                "bookingTime": this.state.time,
            })
        }).then((response) => response.json())
        .then((data) => 
            console.log(data),
            this.props.navigation.navigate('CurrentOrder')
        )
    }

    render() {
        return (
            <View style={style.container}>
            <ScrollView scrollEnabled={this.state.enable}>
                <Text style={{ fontSize: 40, alignItems: 'center', alignSelf: 'center', fontWeight: 'bold', marginTop: 30, marginBottom: 50 }}>Create Request</Text>
                <TouchableOpacity style={{marginHorizontal:30 , backgroundColor:'white' , marginBottom:20 , height:50 , justifyContent:'center' , borderColor:'#dcdcdc' , borderWidth:1 , borderRadius:5}}
                    onPress ={() => this.setState({isVisible:true})}
                >
             

                    <Text style={{fontSize:20,paddingLeft:10}}>
                        {this.state.picked ? this.state.date + this.state.time  :`${[this.state.date].toLocaleString().slice(8, 10)}/${[this.state.date].toLocaleString().slice(5, 7)}/${[this.state.date].toLocaleString().slice(0, 4)}\t\t`+this.state.time}
                    </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={this.state.isVisible}
                    mode="datetime"
                    onConfirm={(date) => this.setState({
                        date:`${date.toDateString()} `,
                        time:`${date.getHours() % 12 || 12}:${date.getMinutes() <=9 ? '0'+date.getMinutes() : date.getMinutes()} ${date.getHours()/12 >= 1 ? 'PM' : 'AM'}`,
                        isVisible:false,
                        picked:true
                    })}
                    onCancel={() => console.log('')}
                />
                <View style={{marginBottom:20}}>
                <DropDownPicker
                    items={[
                        { label: 'Hourly Booking', value: 'Hourly' },
                        { label: 'Day wise booking' , value: 'Number of days'}
                    ]}
                    placeholder = {this.state.type_of_booking}
                    containerStyle={{ height: 50 }}
                    style={{ backgroundColor: '#fafafa' , marginHorizontal:30, }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={item => this.setState({
                        type_of_booking: item.value
                    })}
                    labelStyle={{
                        fontSize:20,
                        textAlign: 'left',
                        color: '#000'
                    }}
                    defaultValue = {this.state.type_of_booking}

                />
                    <this.Input />
                
                </View>
                <View style={{marginBottom:20}}>
                <Text 
                    style={{   marginHorizontal:30,height: 50,fontSize:20 , borderWidth:1,paddingTop:10,paddingLeft:10,borderColor:'grey' , borderRadius:10 }}
                
                >{this.state.foodType}</Text>
                </View>
                <Text 
                    style={{   marginHorizontal:30,height: 50,fontSize:20 , borderWidth:1,paddingTop:10,paddingLeft:10,borderColor:'grey' , borderRadius:10 }}
                
                >{this.state.Cuisine}</Text>
                <Text style = {style.text}>Price Range</Text>
                <View style={{flexDirection:'row' , justifyContent:'center' , marginTop:20}}>
                <Text
                        style={style.textinput2}
                    >{this.state.priceLow}</Text>
                 <Text
                    
                        style={style.textinput2}

                >{this.state.priceMax}</Text>
                </View>
                <Text style = {style.text}>Address Details</Text>
                <Text style={style.textinput3}>{this.state.location}</Text>
                <TouchableOpacity style={{alignSelf:'center' , backgroundColor:'#000' , marginVertical:30 , borderRadius:10}} onPress={() => this.sendRequest()} >
                    <Text style = {style.button}>Edit Request</Text>
                </TouchableOpacity>
            </ScrollView>
            </View>
        )
    }
}
const style = StyleSheet.create({
    container: {
        flex: 1,
    },

    text: {
        fontSize: 20,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        paddingRight: 10,
        borderColor: 'grey',
        marginHorizontal:30,
        fontWeight:'bold'
    },
    textinput: {
        fontSize: 20,
        paddingLeft:10,
        borderColor:'grey' , 
        borderWidth:1,
        borderRadius:10,
        backgroundColor:'#fff'
    },
    button: {
        fontSize: 25,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        paddingRight: 10,
        color: 'white'

    },
    textinput2: {
        fontSize: 20,
        paddingLeft:10,
        borderColor:'grey' , 
        borderWidth:1,
        borderRadius:10,
        backgroundColor:'#fff',
        marginHorizontal:20,
        width:120
    },
    textinput3: {
        fontSize: 20,
        paddingLeft:10,
        borderColor:'grey' , 
        borderWidth:1,
        borderRadius:10,
        marginHorizontal:20,
        marginTop:15,
    },
})

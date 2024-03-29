import React from 'react';
import { Text, StyleSheet, ImageBackground, Image, View, TextInput, TouchableOpacity ,ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker  from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-community/async-storage'
import { ThemeColors } from 'react-navigation';
import moment from 'moment'

export default class CreateRequest extends React.Component {
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
            Multiplier:0,
            building:'',
            see:false
        }
    }
    componentDidMount = async() => {
        const location = await AsyncStorage.getItem('Location')
        
        const loc = JSON.parse(location)
        console.log(loc)
        location !== null ? 
            this.setState({
                location : loc.completeAddress,
                longLat : loc.long_lat
            }) :
            this.setState({
                location : ''
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
        if( this.state.type_of_booking && this.state.Cuisine && this.state.bookingQuantity && this.state.time && this.state.type_of_meal && this.state.location)
        {
        Alert.alert("Added your request")
        fetch('https://maharaj-3.herokuapp.com/api/v1/req/create',
        {
            method:"POST",
            headers:{
                "Authorization":token,
                "Content-Type":"application/json                "
            },
            body:JSON.stringify({
                "bookingType": this.state.type_of_booking,
                "bookingQuantity": this.state.bookingQuantity,
                "foodType": this.state.type_of_meal,
                "cuisine": this.state.Cuisine.toString(),
                "priceLow": this.state.priceLow.toString(),
                "priceMax": this.state.priceMax.toString(),
                "address": this.state.Flat_no + " " +  this.state.building +" "+  this.state.location,
                "bookingDate": this.state.date,
                "bookingTime": this.state.time,
                "location": {
                    "coordinates": {
                        "latitude": this.state.longLat.lat,
                        "longitude": this.state.longLat.lng
                    }
                }      
            })
        }).then((response) => response.json()).then((data) => {
            console.log(data.data._id)
            fetch('https://maharaj-3.herokuapp.com/api/v1/req/start/'+data.data._id , 
                {
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    }
                }            
            ).then(response => response.json()).then((data) => 
                this.props.navigation.navigate('CurrentOrder')
            )
        })
        }
        else {
            Alert.alert("Please fill all the fields")
        }
    }
    handlePicker = (datetime) => {
        const rn = moment(new Date()).format('YYYY-MM-DD')
        const data = moment(datetime).format('YYYY-MM-DD')
        
        
        if(moment(rn).isSameOrAfter(data))
              Alert.alert("Invalid Date")
          else {
              this.setState({
                  isVisible: false,
                  date: datetime,
                  time: `${datetime.getHours() <=9 ? '0' + datetime.getHours() : datetime.getHours()}:${datetime.getMinutes() <=9 ? '0'+datetime.getMinutes() : datetime.getMinutes()}`
                  //date_time : moment(datetime).format()
                  
              },)//() => console.log("Date is ", this.state.date))
          }
           
        
        //console.warn("A date has been picked: ", date);
    }

    hidePicker = (datetime) => {
      this.setState({
          isVisible: false,
          //date: moment(datetime).format(),
          
      },)//() => console.log("Date issss ", this.state.date))
      
  }

  showPicker = () => {
      //console.log('hell')
      this.setState({
          isVisible: true,
      })
      //console.log(this.state.isVisible)
  }


    render() {
        return (
            <View style={style.container}>
            <ScrollView scrollEnabled={this.state.enable}>
                <Text style={{ fontSize: 30, alignItems: 'center', alignSelf: 'center', fontWeight: 'bold', marginTop: 30, marginBottom: 30 }}>Create Request</Text>
                <TouchableOpacity style={{marginHorizontal:30 , backgroundColor:'white' , marginBottom:15 , height:40 , justifyContent:'center' , borderColor:'#dcdcdc' , borderWidth:1 , borderRadius:5}}
                    onPress ={() => this.setState({isVisible:true})}
                >
                    <Text style={{fontSize:15,paddingLeft:10}}>
                        {this.state.date ? this.state.date.toString().slice(0,16) + moment(this.state.time,"hh:mm").format("h:mm A")  :'Date And Time of Booking'}
                    </Text>
                </TouchableOpacity>
                <DateTimePicker
                        isVisible={this.state.isVisible}
                        mode='datetime'
                        display = {'spinner'}
                        onConfirm={this.handlePicker}
                        onCancel={this.hidePicker}
                />
                <View style={{marginBottom:15}}>
                <DropDownPicker
                    items={[
                        { label: 'Hourly Booking', value: 'Hourly' },
                        { label: 'Day wise booking' , value: 'Number of days'}
                    ]}
                    placeholder = 'Type of booking'
                    containerStyle={{ height: 40 }}
                    style={{ backgroundColor: '#fafafa' , marginHorizontal:30, }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={item => this.setState({
                        type_of_booking: item.value,
                    })}
                    labelStyle={{
                        fontSize:15,
                        textAlign: 'left',
                        color: '#000'
                    }}

                />
                    <this.Input />
                
                </View>
                <DropDownPicker
                    items={[
                        { label: 'Jain', value: 'Jain' },
                        { label: 'Veg', value: 'Veg' },
                        { label: 'Non-Veg' , value: 'Non-Veg'}
                    ]}
                    placeholder = 'Food Type'
                    containerStyle={{ height: 40 }}
                    style={{ backgroundColor: '#fafafa' , marginHorizontal:30, }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={item => this.setState({
                        type_of_meal: item.value
                    })}
                    labelStyle={{
                        fontSize:15,
                        textAlign: 'left',
                        color: '#000'
                    }}
                />
                <View style = {{marginTop:15}}>
                <DropDownPicker
                    items={[
                        { label: 'Punjabi',value:'Punjabi' },
                        { label: 'South Indian', value:'South Indian'},
                        { label: 'Italian' , value:'Italian'},
                        { label: 'Rajasthani ' , value:'Rajasthani '},
                        { label: 'Chinese' , value:'Chinese'},
                        { label: 'Continental' , value:'Continental'},
                        { label: 'Gujurati' , value:'Gujurati'},
                    ]}
                    placeholder = 'Cuisine'
                    containerStyle={{ height: 40 }}
                    style={{ backgroundColor: '#fafafa' , marginHorizontal:30, }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={item => {
                        this.setState({
                            Cuisine: item
                        })
                    }}
                    labelStyle={{
                        fontSize:15,
                        textAlign: 'left',
                        color: '#000'
                    }}
                    multiple={true}
                    multipleText={this.state.Cuisine.toString()}
                    min={0}
                    max={3}
                    onOpen={() => this.setState({enable:false})}
                    onClose={() => this.setState({enable:true})}
                />
                </View>
                <Text style = {style.text}>Price Range</Text>
                <View style={{flexDirection:'row' , justifyContent:'center' , marginTop:15}}>
                <Text style={{fontSize:15, paddingTop:5}}>Rs.</Text>
                <Text style={style.text2}>{this.state.priceLow.toString()}</Text>
                <Text style={{fontSize:15, paddingTop:5,paddingRight:10}}>to</Text>
                <Text style={{fontSize:15, paddingTop:5}}>Rs.</Text>
                <Text style={style.text2}>{this.state.priceMax.toString()}</Text>
                
                </View>
                <Text style = {style.text}>Address Details</Text>
                
                <View style={{flexDirection:'row' , justifyContent:'center' ,marginTop:15}}>
                <TextInput
                keyboardType={'ascii-capable'}
                        placeholder='Address Line1'
                        onChangeText={(text) => this.setState({
                            Flat_no:text
                        })}
                        style={style.textinput2}
                ></TextInput>
                </View>
                <View style={{flexDirection:'row' , justifyContent:'center' ,marginTop:15}}>

                <TextInput
                keyboardType={'ascii-capable'}
                        placeholder='Address line 2'
                        onChangeText={(text) => this.setState({
                            building:text
                        })}
                        style={style.textinput2}
                ></TextInput>
                </View>
                <Text style = {style.text}>Complete Address</Text>
                <TouchableOpacity onPress={() => this.state.location ? this.props.navigation.navigate('Maps') : Alert.alert("Please add a location from home screen to see location on the Map")} >
                <Text style={style.textinput3}>{this.state.location ? this.state.Flat_no +" "+ this.state.building +" "+ this.state.location : "Please add your location"}</Text>
                </TouchableOpacity>
                <Text style={{marginLeft:20,color:'red' , fontSize:15}}>{"*To change address please go to home screen \nTouch to view in maps"}</Text>
                <TouchableOpacity style={{alignSelf:'center' , backgroundColor:'#000' , marginVertical:30 , borderRadius:10}} onPress={() => this.sendRequest()} >
                    <Text style = {style.button}>Confirm Request</Text>
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
        fontSize: 15,
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
        fontSize: 15,
        paddingLeft:10,
        borderColor:'grey' , 
        borderWidth:1,
        borderRadius:10,
        backgroundColor:'#fff'
    },
    button: {
        fontSize: 20,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        paddingRight: 10,
        color: 'white'

    },
    textinput2: {
        fontSize: 15,
        paddingLeft:10,
        borderColor:'grey' , 
        borderWidth:1,
        borderRadius:10,
        marginHorizontal:20,
        alignSelf:'center',
        backgroundColor:"#fff",
        marginVertical:5,
        flexGrow:100
    },
    textinput3: {
        fontSize: 15,
        paddingLeft:10,
        borderColor:'grey' , 
        borderWidth:1,
        borderRadius:10,
        marginHorizontal:20,
        marginTop:15,
    },
    text2: {
        fontSize: 15,
        borderColor:'grey' , 
        borderRadius:10,
        marginHorizontal:20,
        fontWeight:'bold',
        paddingTop:5
        
    },
})

import React from 'react';
import { Text, StyleSheet, ImageBackground , Image, View , TouchableOpacity , FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment'

export default class PastOrder extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            location : '',
            data:[]
        }
    }


    onFocusFunction = async() =>{
        this.getOrder()     
    }
    getOrder = async() =>{
        let token = await AsyncStorage.getItem('token')
            console.log(token)
            fetch('https://maharaj-3.herokuapp.com/api/v1/maharajReq/past',
            {
                method:'GET',
                headers:{
                    "Authorization":token,
                    "Content-Type":"application/json"
                }
            }, ).then((response) => 
                response.json()
            
        ).then((data) =>{
            console.log(data.data)
            this.setState({data : data.data})
        })
    }
    componentDidMount= async() => {   
            this.getOrder()
            this.focusListner = this.props.navigation.addListener('didFocus' , () =>{
                this.onFocusFunction()
            })
    }
   
      

render(){
    return(
        <View style = {style.container}>
            <View style ={{flexDirection:'row' ,backgroundColor:'#000',  }}>
                    <Text style = {{fontSize : 18 ,color :'#fff' , fontWeight:'bold' , marginLeft:10 , marginVertical:10, borderBottomWidth:1 ,marginTop:10}}>Past Orders</Text>
            </View>
            {
                  this.state.data.toString() === "" ?
                  <View style={{justifyContent:'center',flex:1 , paddingBottom:100}}>
                  <Image source ={require('../images/hat.png')} style ={{height:200 , width:200 , justifyContent:'center',alignSelf:'center'}}/>
                  <Text style={style.Company}>
                  MyMaharaj
              </Text>
              </View>
              :
            <FlatList
             data={this.state.data}
             keyExtractor={(item, index) => item._id}
             renderItem ={ ({ item, index }) =>            
            <TouchableOpacity style={style.box} onPress = {() => {this.props.navigation.navigate('Details',{'details':item})}}>
                <View style={{ flexDirection: 'column',alignItems:"center"}} >
                <Image source ={require('../images/hat.png')} style ={{height:70 , width:100 }}/>
                    <Text style={style.boxText2}>Date of Booking: {`${[item.bookingDate].toLocaleString().slice(8,10)}/${[item.bookingDate].toLocaleString().slice(5,7)}/${[item.bookingDate].toLocaleString().slice(0,4)}`} </Text>
                    <Text style={style.boxText2}>Time of Booking : {moment(item.bookingTime,"hh:mm").format("h:mm A")}</Text>
                    <Text style={style.boxText2}>Cuisine : {item.cuisine }</Text>
                    <Text style={style.boxText}>Location : {item.address }</Text>
                </View>
                
                
            </TouchableOpacity>
            
             }
            />
            }
           
        </View>
)}
}
const style = StyleSheet.create({
    container: {
        flex:1,
    },

    text:{
        color:'white',
        fontSize:50,
        textAlign:'center'
    } ,
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor:'#000',
        borderRadius:70
      },
    
      box: {
        borderColor: 'black',
        margin: 10,
        borderWidth: 1 ,
        backgroundColor:'#fff',
    },
    boxText: {
        color: 'black',
        margin: 5,
        fontSize:15,
        

    },
    boxText2: {
        color: 'black',
        margin: 5,
        fontSize:15,
        marginBottom:0

    },
    Company: {
        alignSelf: 'center',
        marginBottom: 20,
        fontWeight: "400",
        fontSize: 25,
    },


})

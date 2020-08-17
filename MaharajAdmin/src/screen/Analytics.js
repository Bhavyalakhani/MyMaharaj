import React from 'react';
import { Text, StyleSheet, ImageBackground , Image, View , TouchableOpacity , FlatList , } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animated from 'react-native-animatable'


export default class Analytics extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            location : '',
            data:[],
            isVisible:false,
            flatdata:[]
        }
    }
    onFocusFunction = async() =>{
        this.getOrder()     
    }
    
    getOrder = async() =>{
            fetch('https://maharaj-3.herokuapp.com/api/v1/maharajReq/admin',
            {
                method:'GET',
                headers:{
                    "Content-Type":"application/json"
                }
            }, ).then((response) => 
                response.json()
            
        ).then((data) =>{
            console.log(data.data)
            this.setState({data : data.data.reverse(),
                flatdata:data.data,
            })
        })
    }

    componentDidMount= async() => {       
            this.getOrder()
            this.focusListner = this.props.navigation.addListener('didFocus' , () =>{
                this.onFocusFunction()
            })
    }
    onOngoingpress = () =>{
        const result = this.state.data.filter(data => data.status === "ongoing")
        console.log(result)
        this.setState({
            flatdata:result,
            isVisible:false})
    }
    onCompletepress = () =>{
        const result = this.state.data.filter(data => data.status === "completed")
        console.log(result)
        this.setState({flatdata:result,
            isVisible:false})
    }
    onUnacceptedpress = () =>{
        const result = this.state.data.filter(data => data.status === "unaccepted")
        console.log(result)
        this.setState({flatdata:result,
            isVisible:false})
    }
      

render(){
    return(
        <View style = {style.container}>
            
            <Text style = {{margin:18,fontSize:30 , fontWeight:'bold',marginBottom:10}}>Request</Text>
            {
                this.state.isVisible ?
                <Animated.View
                    animation = "fadeInRight"
                >
                <TouchableOpacity style={style.filter} onPress = {() => this.setState({flatdata:this.state.data , isVisible:false})}>
                    <Text style={style.filtertext}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.filter} onPress={() => this.onOngoingpress()}>
                    <Text style={style.filtertext}>Ongoing</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.filter} onPress={() => this.onCompletepress()}>
                    <Text style={style.filtertext}>Completed</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.filter} onPress={() => this.onUnacceptedpress()}> 
                    <Text style={style.filtertext}>Unaccepted</Text>
                </TouchableOpacity>    
                </Animated.View>
                :
                null
        }
            
            <FlatList
             data={this.state.flatdata}
             keyExtractor={(item, index) => item._id}
             renderItem ={ ({ item, index }) =>
            
             
            <TouchableOpacity style={style.box}
            onPress={() => {this.props.navigation.navigate('DetailsAdmins',{'details':item})}}
            >
                    <Text style={style.boxText2}>Date of Booking: {`${[item.bookingDate].toLocaleString().slice(8,10)}/${[item.bookingDate].toLocaleString().slice(5,7)}/${[item.bookingDate].toLocaleString().slice(0,4)}`} </Text>
                    <Text style={style.boxText2}>Time of Booking : {item.bookingTime}</Text>
                    <Text style={style.boxText2}>Cuisine : {item.cuisine }</Text>
                    <Text style={style.boxText}>Status : {item.status }</Text>
               
            </TouchableOpacity> 
             }
             
            />

            
            <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this.setState({isVisible:!this.state.isVisible})}
          style={style.TouchableOpacityStyle}>
           <Icon name = 'filter' size = {30} color = '#fff'/> 
        </TouchableOpacity>
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
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        top: 10,
        backgroundColor:'#000',
        borderRadius:50
      },
    
      box: {
        borderColor: 'black',
        margin: 10,
        borderWidth: 1 ,
        borderRadius:10 , 
        backgroundColor:'#fff',
    },
    boxText: {
        color: 'black',
        margin: 10,
        fontSize:18,
        

    },
    boxText2: {
        color: 'black',
        margin: 10,
        fontSize:18,
        marginBottom:0

    },
    filter:{
        flexDirection:'row',
        justifyContent:'flex-end',
        marginRight:30,
        marginVertical:5,

    },
    filtertext:{
        fontSize:17,
        backgroundColor:'#000',
        color:'#fff',
        width:120,
        textAlign:'center',
        fontWeight:'bold',
        paddingVertical:10
    }

})

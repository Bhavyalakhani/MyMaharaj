import React from 'react';
import { Text, StyleSheet, ImageBackground , Image, View , TouchableOpacity , FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment'

export default class CurrentOrder extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            location : '',
            data:[]
        }
    }
    onFocusFunction = async() =>{
        this.getloc() 
        this.getOrder()     
    }
    getloc = async() =>{
        const location = await AsyncStorage.getItem('Location')
        const loc = JSON.parse(location)
        console.log(loc)
        location !== null ? 
            this.setState({
                location : loc.title
            }) :
            this.setState({
                location : 'Please add your location'
            })
    }
    getOrder = async() =>{
        let token = await AsyncStorage.getItem('token')
            
            console.log(token)
            fetch('https://maharaj-3.herokuapp.com/api/v1/req/ongoing',
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
            
            this.getloc()
            this.getOrder()
            this.focusListner = this.props.navigation.addListener('didFocus' , () =>{
                this.onFocusFunction()
            })
    }
      componentWillUnmount() {
          if(this.focusListner.remove()){
              this.focusListener.remove()
         }
      }

render(){
    return(
        <View style = {style.container}>
            <TouchableOpacity style = {{ backgroundColor:'#000'  , justifyContent:'center' ,paddingTop:18}} onPress={() => this.props.navigation.navigate('Location')}>
                <Text style ={{fontSize:15 , color:'#fff' , paddingLeft:10 ,}}>Deliver to </Text>
                <View style ={{flexDirection:'row' , }}>
                    <Text style = {{fontSize : 18 ,color :'#fff' , fontWeight:'bold' , marginLeft:10 , marginVertical:10, borderBottomWidth:1 ,borderBottomColor:'#fff',marginTop:0}}>{this.state.location}</Text>
                    <Icon name = "chevron-down" size = {15} color = {'#fff'} style={{paddingTop:5,paddingLeft:30 , marginRight:100}}/>
                </View>
            </TouchableOpacity>
            <Text style = {{margin:18,fontSize:30 , fontWeight:'bold',marginBottom:10}}>Current Orders</Text>
            
            <FlatList
             data={this.state.data.reverse()}
             renderItem ={ ({ item, index }) =>
            
            
            <TouchableOpacity style={style.box} onPress={() => {this.props.navigation.navigate('Details',{'details':item})}}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={style.boxText2 }>REQUEST ID: {item._id} </Text>
                    <Text style={style.boxText2}>Date of Booking: {`${[item.bookingDate].toLocaleString().slice(8,10)}/${[item.bookingDate].toLocaleString().slice(5,7)}/${[item.bookingDate].toLocaleString().slice(0,4)}`} </Text>
                    <Text style={style.boxText2}>Time of Booking : {moment(item.bookingTime,"hh:mm").format("h:mm A")}</Text>
                    <Text style={style.boxText}>Status : {item.acceptedBy ? "Accepted" : "Pending" }</Text>
                </View>
            </TouchableOpacity>
            
             }
            />
            
            <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this.props.navigation.navigate('CreateRequest')}
          style={style.TouchableOpacityStyle}>
          {/* <Icon name = 'plus' size = {40} color = '#fff'/> */}
            <Text style ={{color:'#fff' , fontSize:60 , paddingBottom:10}}>+</Text>
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
        margin: 10,
        fontSize:18,
        

    },
    boxText2: {
        color: 'black',
        margin: 10,
        fontSize:18,
        marginBottom:0

    }

})

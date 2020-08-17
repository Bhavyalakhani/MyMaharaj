import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    Linking
} from "react-native";
import * as Animatable from "react-native-animatable"
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment'
import Icon from 'react-native-vector-icons/AntDesign'

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isloading: true,
            details: [],
            x: [],
            user:{},
            visible:false

        }
    }

    componentDidMount() {
        const details = this.props.navigation.getParam('details')
        console.log(details)
        this.state.x.push(details)
        this.setState({
            details: this.state.x,
            isloading: false
        })
        
        
        if (details.status !== "completed") {
            if (moment().format("DD/MM/YYYY") === moment(details.bookingDate.slice(0, 22)).format("DD/MM/YYYY")) {
                const currentTime = moment().hours() * 60 + moment().minutes()
                const bookingTime = (parseInt(details.bookingTime.slice(0, 2))) * 60 + parseInt(details.bookingTime.slice(3, 5))
                console.log(bookingTime)
                if (bookingTime - currentTime < 360) {
                    console.log("lol")
                    this.CreatedBy(details.createdBy)
                    this.setState({
                        visible: true
                    })
                }
            }
        }
    }
    onAccept = async (id) => {
        const token = await AsyncStorage.getItem('token')
        console.log(token)
        console.log(id)
        fetch('https://maharaj-3.herokuapp.com/api/v1/maharajReq/' + id,
            {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            }).then((response) =>
                response.json()

            ).then((data) => {
                console.log(data.data)
                this.props.navigation.navigate("CurrentOrder")
            })


    }
    onComplete = async(id) =>{
        console.log(id)
        fetch('https://maharaj-3.herokuapp.com/api/v1/req/complete/'+id,
            {
                method:'PUT',
                headers:{
                    "Content-Type":"application/json",
                }
            }, ).then((response) => 
                response.json()
            
        ).then((data) =>{
            console.log(data.data)
            this.props.navigation.navigate("Home")
        })
        
    }
    openGps = (lat, lng) => {
        console.log(lat , lng)
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`);
      }
      onModified = async(accepted,id) =>{
        console.log(id)
        const token = await AsyncStorage.getItem('token')
        fetch('https://maharaj-3.herokuapp.com/api/v1/maharajReq/modify/'+id,
            {
                method:'PUT',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": token
                },
                body : JSON.stringify({
                    "acceptChanges":accepted
                })
            }, ).then((response) => 
                response.json()
            
        ).then((data) =>{
            console.log(data.data)
            this.props.navigation.navigate("Home")
        })
        
    }
    CreatedBy = (id) => {
        fetch("https://maharaj-3.herokuapp.com/api/v1/auth/users/" + id)
            .then(response => response.json()).then((result) => {
                console.log(result)
                this.setState({ user: result })
            })
            .catch(error => console.log('error', error));
    }
    render() {
        if (this.state.isloading) {
            return (
                <View style={style.container}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            )
        }
        else {
            return (
                <View>
                    <Animatable.View
                        animation='fadeInUpBig'
                    >
                        <Text style={{ margin: 18, fontSize: 30, fontWeight: 'bold', marginBottom: 10 }}>Details</Text>
                        <FlatList
                            data={this.state.details}
                            keyExtractor={(item, index) => item._id}
                            renderItem={({ item, index }) =>
                                item.location ?
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={style.boxText2}>Date of Booking: {`${[item.bookingDate].toLocaleString().slice(8, 10)}/${[item.bookingDate].toLocaleString().slice(5, 7)}/${[item.bookingDate].toLocaleString().slice(0, 4)}`} </Text>
                                        <Text style={style.boxText2}>Time of Booking : {item.bookingTime}</Text>
                                        <Text style={style.boxText2}>{item.bookingType + " :\t" + item.bookingQuantity} </Text>
                                        <Text style={style.boxText2}>Foodtype : {item.foodType} </Text>
                                        <Text style={style.boxText2}>Cuisine : {item.cuisine}</Text>
                                        <Text style={style.boxText2}>Address : {item.address}</Text>
                                        { item.status === "completed" ?
                                        <Text style={[style.boxText2,{fontWeight:'bold'}]}>Amount Paid : {item.priceMax}</Text>: null
                                        }
                                        { item.status === "accepted" ?
                                        <TouchableOpacity onPress = {() => this.openGps(item.location.coordinates.latitude, item.location.coordinates.longitude)}>
                                            <Text style = {[style.boxText2 , {fontWeight:'bold' , backgroundColor:'#000' , color:'#fff', width:160,padding:10}]}>Show Directions</Text>
                                        </TouchableOpacity> : null
                                        }
                                        {this.state.visible?
                                            <View>
                                                <Text style={style.boxText2}>Name : {this.state.user.name}</Text>
                                                <Text style={style.boxText2}>Phone Number : {this.state.user.mobile}</Text>
                                                <View style={{ flexDirection: 'row', justifyContent: "space-evenly", marginTop: 10 }}>
                                                    <TouchableOpacity style={{ justifyContent: 'center', marginTop: 10 }} onPress={() => Linking.openURL(`tel:+91${this.state.user.mobile}`)}>
                                                        <Icon name="phone" size={50} color='#000' />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ justifyContent: 'center', marginTop: 10 }} onPress={() => Linking.openURL(`sms:${this.state.user.mobile}`)}>
                                                        <Icon name="message1" size={50} color='#000' />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            :
                                            null} 
                                        {
                                            item.acceptedBy  ?
                                                item.modified ? 
                                                <View>
                                                    <Text style = {[style.boxText,{paddingLeft:10}]}>Order details has been modified</Text>
                                                <View style = {{flexDirection:'row' , justifyContent:'center'}}>
                                                    
                                                <TouchableOpacity style={{ justifyContent: "center", flexDirection: 'row', flex: 0 }} onPress={() => this.onModified(true,item._id)}>
                                                <Text style={[style.boxText, { color: '#fff', backgroundColor: 'green', padding: 15, borderRadius: 10, fontWeight: 'bold' }]}>Accept</Text>
                                                </TouchableOpacity> 
                                                <TouchableOpacity style={{ justifyContent: "center", flexDirection: 'row', flex: 0 }} onPress={() => this.onModified(false,item._id)}>
                                                <Text style={[style.boxText, { color: '#fff', backgroundColor: 'red', padding: 15, borderRadius: 10, fontWeight: 'bold' }]}>Reject</Text>
                                            </TouchableOpacity> 
                                                </View>
                                                </View>
                                            :
                                                
                                                item.status === "accepted" ?
                                                    <TouchableOpacity style={{ justifyContent: "center", flexDirection: 'row', flex: 0 }} onPress={() => this.onComplete(item._id)}>
                                                        <Text style={[style.boxText, { color: '#fff', backgroundColor: '#000', padding: 15, borderRadius: 10, fontWeight: 'bold' }]}>Complete</Text>
                                                    </TouchableOpacity> 
                                                    : 
                                                    null
                                                :
                                                <TouchableOpacity style={{ justifyContent: "center", flexDirection: 'row', flex: 1 }} onPress={() => this.onAccept(item._id)}>
                                                <Text style={[style.boxText, { color: '#fff', backgroundColor: '#000', padding: 15, borderRadius: 10, fontWeight: 'bold', paddingHorizontal: 40, marginTop: 50 }]}>Accept</Text>
                                            </TouchableOpacity> 
                
                                      }
                                    </View>
                                    :
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={style.boxText2}>Date of Booking: {`${[item.bookingDate].toLocaleString().slice(8, 10)}/${[item.bookingDate].toLocaleString().slice(5, 7)}/${[item.bookingDate].toLocaleString().slice(0, 4)}`} </Text>
                                        <Text style={style.boxText2}>Time of Booking : {item.bookingTime}</Text>
                                        <Text style={style.boxText2}>Cuisine : {item.cuisine}</Text>
                                        <Text style={style.boxText2}>Location : {item.address}</Text>
                                        <Text style={style.boxText2}>Foodtype ; {item.foodType} </Text>
                                        <Text style={style.boxText2}>Address : {item.address}</Text>
                                        <Text style={style.boxText}>Max Price : {item.priceMax}</Text>
                                        <Text style={style.boxText2}>CreatedAt : {item.createdAt} </Text>
                                    </View>


                            }

                        />
                    </Animatable.View>
                </View>
            )
        }
    }
}
export default Details;

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxText2: {
        color: 'black',
        margin: 10,
        fontSize: 18,
        marginBottom: 0,
        marginLeft: 18

    },
    boxText: {
        color: 'black',
        margin: 10,
        fontSize: 18,


    }
});
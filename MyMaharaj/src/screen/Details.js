import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    Linking,
    Image,
    ScrollView
} from "react-native";
import * as Animatable from "react-native-animatable"
import AsyncStorage from '@react-native-community/async-storage';
import moment from "moment";
import Icon from "react-native-vector-icons/AntDesign";

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isloading: true,
            details: [],
            x: [],
            maharaj: {},
            visible: false


        }
    }

    componentDidMount() {
        const details = this.props.navigation.getParam('details')
        console.log(details)
        if(details.acceptedBy){
            this.AcceptedBy(details.acceptedBy)
        }
        this.state.x.push(details)
        this.setState({
            details: this.state.x,
            isloading: false
        })
        if (details.status !== "completed") {
            console.log(moment(details.bookingDate.slice(0, 22)).format("DD/MM/YYYY"))
            if (moment().format("DD/MM/YYYY") === moment(details.bookingDate.slice(0, 22)).format("DD/MM/YYYY")) {
                console.log('same day')
                const currentTime = moment().hours() * 60 + moment().minutes()
                const bookingTime = (parseInt(details.bookingTime.slice(0, 2))) * 60 + parseInt(details.bookingTime.slice(3, 5))
                console.log(bookingTime)
                if (bookingTime - currentTime < 360) {
                    console.log('lol')
                    this.setState({
                        visible: true
                    })
                }
            }
        }
    }

    AcceptedBy = (id) => {
        fetch("https://maharaj-3.herokuapp.com/api/v1/maharajAuth/maharajs/" + id)
            .then(response => response.json()).then((result) => {
                console.log(result)
                this.setState({ maharaj: result })
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
                <ScrollView>

                        <Text style={{ margin: 18, fontSize: 30, fontWeight: 'bold', marginBottom: 10 }}>Details</Text>
                        
                        <FlatList
                            data={this.state.details}
                            keyExtractor={(item, index) => item._id}
                            renderItem={({ item, index }) =>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={style.boxText2}>Date of Booking: {`${[item.bookingDate].toLocaleString().slice(8, 10)}/${[item.bookingDate].toLocaleString().slice(5, 7)}/${[item.bookingDate].toLocaleString().slice(0, 4)}`} </Text>
                                    <Text style={style.boxText2}>Time of Booking : {moment(item.bookingTime,"hh:mm").format("h:mm A")}</Text>
                                    <Text style={style.boxText2}>{item.bookingType + " :\t" + item.bookingQuantity} </Text>
                                    <Text style={style.boxText2}>Foodtype : {item.foodType} </Text>
                                    <Text style={style.boxText2}>Cuisine : {item.cuisine}</Text>
                                    <Text style={style.boxText2}>Address : {item.address}</Text>

                                    {item.status === 'completed' ?
                                        <View>
                                            <Text style={style.boxText2}>Maharaj Name : {this.state.maharaj.name}</Text>
                                            <Image source={{ uri: "https://maharaj-3.herokuapp.com" + this.state.maharaj.imageURL }} style={{ height: 100, width: 100 }} />
                                            <Text style={style.boxText2}>Amount : {item.priceLow} </Text>
                                        </View>
                                        :
                                        this.state.visible ?
                                            item.acceptedBy ?
                                                <View>
                                                    <Text style={style.boxText2}>Low price : {item.priceLow} </Text>
                                                    <Text style={style.boxText2}>Max price : {item.priceMax} </Text>
                                                    <Text style={[style.boxText2, { fontWeight: "bold" }]}>You can't edit request within 6 hours of booking</Text>
                                                    <Text style={style.boxText2}>Maharaj Name : {this.state.maharaj.name}</Text>
                                                    <Text style={style.boxText2}>Phone Number : {this.state.maharaj.mobile}</Text>
                                                    <View style={{ flexDirection: 'row', justifyContent: "space-evenly", marginTop: 10 }}>
                                                        <TouchableOpacity style={{ justifyContent: 'center', marginTop: 10 }} onPress={() => Linking.openURL(`tel:+91${this.state.maharaj.mobile}`)}>
                                                            <Icon name="phone" size={50} color='#000' />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{ justifyContent: 'center', marginTop: 10 }} onPress={() => Linking.openURL(`sms:${this.state.maharaj.mobile}`)}>
                                                            <Icon name="message1" size={50} color='#000' />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                :
                                                null
                                            :
                                            item.modified ?
                                                    <View>
                                                        <Text style={style.boxText2}>Low price : {item.priceLow} </Text>
                                                        <Text style={style.boxText2}>Max price : {item.priceMax} </Text>
                                                        <Text style={[style.boxText2, { fontWeight: 'bold', fontSize: 22 }]}>Awaiting for response of maharaj</Text>
                                                    </View>
                
                                                :
                                                <View>
                                                    <Text style={style.boxText2}>Low price : {item.priceLow} </Text>
                                                    <Text style={style.boxText2}>Max price : {item.priceMax} </Text>
                                                    <TouchableOpacity style={{ justifyContent: "center", flexDirection: 'row', flex: 1 }} onPress={() => this.props.navigation.navigate("ModifyRequest", { "item": item })}>
                                                        <Text style={[style.boxText, { color: '#fff', backgroundColor: '#000', padding: 15, borderRadius: 10, fontWeight: 'bold', paddingHorizontal: 40, marginTop: 50 }]}>Edit</Text>
                                                    </TouchableOpacity>
                                                </View>
                                    }

                                </View>


                            }

                        />
                    
                </ScrollView>
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
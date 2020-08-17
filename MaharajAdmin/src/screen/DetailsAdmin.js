import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList
} from "react-native";
import * as Animatable from "react-native-animatable"

class DetailsAdmin extends Component {
    constructor(props){
        super(props);
        this.state={
            isloading:true,
            details:[],
            x:[]
            
        }
    }

    componentDidMount(){
        details= this.props.navigation.getParam('details')
        this.state.x.push(details)
        this.setState({
            details:this.state.x,
            isloading:false
        })
    }
    render() {
        if(this.state.isloading){
            return(
                <View style={style.container}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            )
        }
        else{
            return(
            <View>
                <Animatable.View
                animation='fadeInUpBig'
                >
                <FlatList
                data={this.state.details}
                keyExtractor={(item, index) => item._id}
                renderItem ={ ({ item, index }) =>{
                    console.warn(item.location)
                if(item.location)
                return(
                <View style={{ flexDirection: 'column' }}>
                       <Text style={style.boxText2}>Date of Booking: {`${[item.bookingDate].toLocaleString().slice(8,10)}/${[item.bookingDate].toLocaleString().slice(5,7)}/${[item.bookingDate].toLocaleString().slice(0,4)}`} </Text>
                       <Text style={style.boxText2}>Time of Booking : {item.bookingTime}</Text>
                       <Text style={style.boxText2}>Cuisine : {item.cuisine }</Text>
                       <Text style={style.boxText2}>Location : {item.address }</Text>
                       <Text style={style.boxText2}>Foodtype : {item.foodType} </Text>
                       <Text style={style.boxText2}>Address : {item.location.formattedAddress} </Text>
                       <Text style={style.boxText2}>Zipcode : {item.location.zipcode} </Text>
                       <Text style={style.boxText}>Country : {item.location.country}</Text>
                       <Text style={style.boxText2}>Max price : {item.priceMax} </Text>
                       <Text style={style.boxText}>Hi</Text>
                   </View>
                )
                else{
                    return(
                   <View style={{ flexDirection: 'column' }}>
                       <Text style={style.boxText2}>Date of Booking: {`${[item.bookingDate].toLocaleString().slice(8,10)}/${[item.bookingDate].toLocaleString().slice(5,7)}/${[item.bookingDate].toLocaleString().slice(0,4)}`} </Text>
                       <Text style={style.boxText2}>Time of Booking : {item.bookingTime}</Text>
                       <Text style={style.boxText2}>Cuisine : {item.cuisine }</Text>
                       <Text style={style.boxText2}>Location : {item.address }</Text>
                       <Text style={style.boxText2}>Foodtype ; {item.foodType} </Text>
                       <Text style={style.boxText2}>Address : {item.address}</Text>
                       <Text style={style.boxText}>Max Price : {item.priceMax}</Text>
                       <Text style={style.boxText2}>CreatedAt : {item.createdAt} </Text>
                   </View>
                    )
                }
                }
                }
               />
               </Animatable.View>
               </View>
            )
        }
    }
}
export default DetailsAdmin;

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxText2: {
        color: 'black',
        margin: 10,
        fontSize:18,
        marginBottom:0

    },
    boxText: {
        color: 'black',
        margin: 10,
        fontSize:18,
        

    }
});
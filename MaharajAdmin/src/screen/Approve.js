import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    TouchableOpacity
} from "react-native";


class Approve extends Component {
    constructor(props){
        super(props);
        this.state={
            isloading:true,
            Data:[]
        }
    }
    componentDidMount(){
        fetch("https://maharaj-3.herokuapp.com/api/v1/maharajAuth/maharajs",{
            method:"GET"
        })
        .then((response) => response.json())
        .then((data) => {
            console.warn(data)
            data = data.filter((approved) =>{
                 return approved.isApproved !== true

            })
            console.log(data)
            this.setState({
                isloading:false,
                Data:data
            })
        })
        .catch((error) =>{
            console.warn(error)
        })
    }
    approve = () =>{
        fetch('')
    }
    render() {
        if(this.state.isloading){
            return(
                <View>
                    <ActivityIndicator size="large" color="#00ff00"  />
                </View>
            )
        }
        else{
            return(
                <View>
                <Text></Text>
                    <FlatList 
                    data={this.state.Data}
                    keyExtractor={(item, index) => item._id}
                    renderItem={({item}) =>
                    <TouchableOpacity style={style.box} onPress={() => {this.props.navigation.navigate('ApproveUser',{'item':item})}}>
                        <View style={{ flexDirection: 'column' }}>
                                <Text style={style.boxText2}>Name: {item.name} </Text>
                                <Text style={style.boxText2}>Number : {item.mobile}</Text>
                                <Text style={style.boxText2}>Cuisine : {item.cooking.cuisine.toString() }</Text>
                                <Text style={style.boxText}>Location : {item.registeredAddress.address }</Text>
                        </View>
                    </TouchableOpacity>}
                    />
                </View>
            )
        }
    }
}
export default Approve;

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    box:{
        borderBottomColor:'grey',
        borderWidth:1,
        fontSize:30,
        flexDirection:'row',
        justifyContent:'space-between',
        margin:10
    },
    text:{
        fontSize:20
    }, boxText: {
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
});
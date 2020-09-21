import React from 'react';
import { Text, StyleSheet, ImageBackground , Image, View,Platform,ActivityIndicator} from 'react-native';
import MapView from 'react-native-maps'
import {Marker,PROVIDER_GOOGLE} from 'react-native-maps'
import Geolocation from "@react-native-community/geolocation"
import {request,PERMISSIONS} from "react-native-permissions"
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
export default class Maps extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          latitude:28.579660,
          longitude:77.321110,
          enable:0,
          isloading:1    
        }
      }
      async componentDidMount(){
        await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000}) //pop up if the mobiles location is not on
        .then(data =>{
            this.setState({isloading:0})
            this.requestLocation()
        })
        .catch(err =>{
            this.setState({isloading:0})
        })


      }





        requestLocation = async() => {
           if(Platform.OS === 'android'){
            var response= await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION); //to check whether the app has been given the permision to use mobiles location
            if(response === 'granted'){
             this.locationCurrentPosition()
            }
            else{
               
            }
           }
       }
    
          locationCurrentPosition = () =>{
             Geolocation.getCurrentPosition(         //get users current location
                 position => {
                     console.log(position)
                   var latitude = Number(JSON.stringify(position.coords.latitude));
                   var longitude = Number(JSON.stringify(position.coords.longitude))
                    
                   this.setState({
                       latitude,
                       longitude
                   });
                 },
                 error => Alert.alert(error.message),
                 { enableHighAccuracy: false, timeout: 10000, maximumAge: 1000 }
               );
   
       }
      
      render() { 
          
        return (  
            <View  style={styles.MainContainer}>
                <MapView
                provider={PROVIDER_GOOGLE}  
                style={styles.mapStyle}  
                showsUserLocation={true}  
                zoomEnabled={true}  
                zoomControlEnabled={true}  
                region={{
                    latitude: this.state.latitude,   
                    longitude: this.state.longitude,  
                    latitudeDelta: 0.003922,  
                    longitudeDelta: 0.003421,  
                }}>    
                <Marker  
                    DRAGGABLE
                    coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }}  
                    title={"Home"}  
                    description={"Java Training Institute"}  
                />  
                </MapView>  
            
          </View>  
        );
        
      }  
    }  
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
    },

    text:{
        color:'white',
        fontSize:50,
        textAlign:'center'
    },
    MainContainer: {  
        position: 'absolute',  
        top: 0,  
        left: 0,  
        right: 0,  
        bottom: 0,  
        alignItems: 'center',
        flex:1    
      },  
      mapStyle: {  
        position: 'absolute',
        alignItems:'center',  
        top: 0,  
        left: 0,  
        right: 0,  
        bottom: 0,  
      },  

})
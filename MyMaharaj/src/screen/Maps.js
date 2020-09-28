import React from 'react';
import { Text, StyleSheet, ImageBackground , Image, View,Platform,ActivityIndicator} from 'react-native';
import MapView from 'react-native-maps'
import {Marker,PROVIDER_GOOGLE} from 'react-native-maps'
import AsyncStorage from '@react-native-community/async-storage'
export default class Maps extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          latitude:28.579660,
          longitude:77.321110,
          enable:0,
          isloading:1 ,
          title: ""   
        }
      }
      async componentDidMount(){
        
          const location = await AsyncStorage.getItem('Location')
          const loc = JSON.parse(location)
          console.log(loc)
          location !== null ? 
              this.setState({
                  latitude : loc.long_lat.lat,
                  longitude : loc.long_lat.lng,
                  title:loc.title
              }) :
              this.setState({
                  location : 'Please add your location'
              })

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
                  title={this.state.title}  
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
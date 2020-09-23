import {createSwitchNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react'

import CreateRequest from './src/screen/CreateRequest'
import CurrentOrder from './src/screen/CurrentOrder'
import Details from './src/screen/Details'
import FAQ from './src/screen/FAQ'
import LoginScreen from './src/screen/LoginScreen'
import PastOrders from './src/screen/PastOrders'
import Profile from './src/screen/Profile'
import Registration from './src/screen/Registration'
import Settings from './src/screen/Settings'
import SplashScreen from './src/screen/SplashScreen'
import Verify from './src/screen/Verify'
import ModifyRequest from './src/screen/ModifyRequest';
import ContactUs from './src/screen/ContactUs';
import Location from './src/screen/Location'
import Maps from './src/screen/Maps'
import OneSignal from 'react-native-onesignal'

export default class App extends React.Component {
  constructor(properties) {
    super(properties);
    //Remove this method to stop OneSignal Debugging 
    OneSignal.setLogLevel(6, 0);
    
    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
    OneSignal.init("fda43136-2c89-4e33-bf7d-72042ecb3fcb", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
    OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.
    
    // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
  
     OneSignal.addEventListener('received', this.onReceived);
     OneSignal.addEventListener('opened', this.onOpened);
     OneSignal.addEventListener('ids', this.onIds);
  }
    componentWillUnmount() {
      OneSignal.removeEventListener('received', this.onReceived);
      OneSignal.removeEventListener('opened', this.onOpened);
    }
  
    onReceived(notification) {
      console.log("Notification received: ", notification);
    }
  
    onOpened(openResult) {
      console.log('Message: ', openResult.notification.payload.body);
      console.log('Data: ', openResult.notification.payload.additionalData);
      console.log('isActive: ', openResult.notification.isAppInFocus);
      console.log('openResult: ', openResult);
    }

    
  render() {

    return (
      
          <AppContainer />
     
    );
  }
}


const CurrentNav = createStackNavigator(
  {
  CreateRequest : CreateRequest,
  ModifyRequest : ModifyRequest,
  Details:Details,
  Maps : Maps,
  CurrentOrder : CurrentOrder,
  Location : Location
},{
  initialRouteName : 'CurrentOrder',
  headerMode:'none'
}

)

const SettingsNav = createStackNavigator({
  FAQ:FAQ,
  ConatctUs:ContactUs,
  Settings:{screen:Settings,
  navigationOptions:{
    headerMode:"on",
    title:'Settings',
    headerTintColor:'white',
    tabBarIcon:() => (
      <Icon name="gear" size={25} color='white' />
      ),
    height:40,
    headerStyle:{
      backgroundColor:'black',
    },
    fontSize:20
  }
  }
},
{
  initialRouteName : 'Settings'
})

const Main = createMaterialTopTabNavigator({
  SettingsNav :{
    screen:SettingsNav ,
    navigationOptions: {title: 'Settings', tabBarIcon: ({ tintColor }) => (
      <Icon name="gear" size={25} color={tintColor} />
      )}
  },
  CurrentNav : {
    screen:CurrentNav ,
    navigationOptions: {title: 'Home', tabBarIcon: ({ tintColor }) => (
      <Icon name="home" size={25} color={tintColor} />
      )}
  },
  Profile:{
    screen:Profile ,
    navigationOptions: {title: 'Accepted Orders', tabBarIcon: ({ tintColor }) => (
      <Icon name="check" size={25} color={tintColor} />
      )}
  },
  PastOrders :{
    screen:PastOrders ,
    navigationOptions: {title: 'Past Orders', tabBarIcon: ({ tintColor }) => (
      <Icon name="book" size={25} color={tintColor} />
      )}
  },
},{
  tabBarPosition: 'bottom',
    tabBarOptions: {activeTintColor: 'white',
    inactiveColor: 'grey', showIcon: 'true',
    style: { backgroundColor: '#212121', },
    labelStyle: {fontSize:12,textTransform:'capitalize'},
    tabStyle:{height:60},
    iconStyle: {inactiveColor:'grey', paddingTop:3, activeColor: 'white'},
    indicatorStyle: { backgroundColor: 'white', height: 4}
  },
  order : ['CurrentNav','PastOrders','Profile','SettingsNav'],
})





const Base = createSwitchNavigator({
  SplashScreen : SplashScreen,
  LoginScreen:LoginScreen,
  Registration : Registration,
  Verify:Verify,
  Main : Main,
},
{
  initialRouteName : 'SplashScreen' ,
  
})



const AppContainer = createAppContainer(Base);

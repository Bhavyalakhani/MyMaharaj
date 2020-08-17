import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import ImagePicker from 'react-native-image-picker'
import AsyncStorage from "@react-native-community/async-storage";


class UploadPhoto extends Component {

      constructor(props){
        super(props);
        this.state={
            photo:'',
            filePath:{},
            fileData: '',
            fileUri: '',
            file:'',
            token:'',
            isimage:0
        }
    }
      async UNSAFE_componentWillMount(){
      const token = await AsyncStorage.getItem('token')
      this.setState({token})
      fetch("https://maharaj-3.herokuapp.com/api/v1/maharajAuth/5f01b441eba4126824cfd706/profileimage",{
        method:'GET',
        headers:{
          'Authorization':"Bearer "+token
        }
      })
      .then((response) => {

      })
      .catch((error) => console.warn(error))
      console.log(this.state.token)

    }
    createFormData = (photo, body) => {
      const data = new FormData();
    
      data.append("image", {
        name: photo.fileName,
        type: photo.type,
        uri:
          Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
      });
    
    
      return data;
    };



    chooseImage = async () => {
        let options = {
          title: 'Select Image',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
//            console.log('User cancelled image picker');
          } else if (response.error) {
//            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
 //           console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = { uri: response.uri };
            this.setState({photo:response})
            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            // alert(JSON.stringify(response));s
            // console.log('response', JSON.stringify(response));
            this.setState({
              filePath: response,
              fileData: response.data,
              fileUri: response.uri
            });
            const blob = this.uriToBlob(response.uri)
            this.setState({file:blob})
            if(blob){
              fetch("http://maharaj-3.herokuapp.com/api/v1/maharajAuth/upload/profile", {
                method: "POST",
                body: {
                  image:this.createFormData(this.state.photo)
                },
                headers:{
                  "Authorization":"Bearer "+this.state.token
                }
              })
                .then(response => response.json())
                .then(response => {
                  console.warn(response)
                  console.log("upload succes", response);
                  alert("Upload success!");
                  this.setState({ photo: null });
                })
                .catch(error => {
                  console.log("upload error", error);
                  alert("Upload failed!");
                });
            }
            
            // const img = this.uploadToFirebase(blob)
            console.log(this.state.token)
          }
        });
      }



  uploadPhotoAsync = async uri => {
    const path = `photos/${this.uid}/${Date.now()}.jpg`;
    const data = new FormData();

  data.append("image", {
    uri:uri.uri 
  });
    return new Promise(async (res, rej) => {
      fetch("http://maharaj-3.herokuapp.com/api/v1/maharajAuth/upload/profile", {
          method: "POST",
          body: data,
          headers: {
            "Authorization": this.state.token
          },
        })
          .then((data) => {
            console.log(data)
            ToastAndroid.showWithGravity('Uploaded Successfully', 2000, ToastAndroid.CENTER)
            this.props.navigation.navigate('Home')
          })
          .catch((error) => console.warn(error))

    })
  }

  renderFileData = () => {
    if (this.state.fileData) {
      return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
        style={styles.profileImage}
      />
    } else {
      return <Image source={require('./profile-pic.png')}
        style={styles.profileImage}
      />
    }
  }
  uriToBlob = (uri) => {

    return new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest();

      xhr.onload = function () {
        // return the blob
        resolve(xhr.response);
      };

      xhr.onerror = function () {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };

      // this helps us get a blob
      xhr.responseType = 'blob';

      xhr.open('GET', uri, true);
      xhr.send(null);

    });

  }



  render() {
    return (
      <View style={styles.container}>
        <Text style={{ marginTop: 35, marginBottom: 30, fontSize: 30 }}>Pick Your Image</Text>
        <View style={styles.action}>
          {this.renderFileData()}
          <TouchableOpacity onPress={() => this.chooseImage()} style={{ alignSelf: 'center', backgroundColor: '#000', marginTop: 30, borderRadius: 10 }}>
            <Text style={styles.text}>Upload your Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default UploadPhoto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 150,
    overflow: "hidden",
    marginBottom: 20,
    alignSelf: 'center'
  },
  button: {
    fontSize: 20,
    marginTop: 20,
    color: 'white'

  },
  text: {
    fontSize: 25,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    paddingRight: 10,
    color: 'white',
    backgroundColor: 'black'
  }
});
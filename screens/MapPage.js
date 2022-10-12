import React from 'react';
import { StyleSheet,Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps


export default function MapPage(){
  return(
    <View style={{width:'100%', height:'100%'}}>
                <Map style={{width:'100%', height:'75%'}}></Map>
                
            </View>
  );
};

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     map:{
//       width:'200',
//       height:'200',
//     }
// });

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';


export default function MapPage(){
      return(
        <View style={styles.container} >
            <MapView style={styles.map} />
        </View>
      );
}

const styles = StyleSheet.create({
      container:{
        flex :1,
        backgroundColor : '#fff',
        alignItems: 'center',
        justifyContent : 'center',
      },
      map: {
        width: '50%',
        height: '50%'
      }
});
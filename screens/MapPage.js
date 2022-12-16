import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {Button, TextInput} from 'react-native-paper';

export default function MapPage() {
  state = {
    search: '',
  };
  updateSearch = search => {
    this.setState({search});
  };
  const {search} = this.state;
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 11.93623,
          longitude: 108.445259,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Marker coordinate={myCordinates}></Marker>
      </MapView>

      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          backgroundColor="#FFFF"
          style={{flex: 1, padding: 0, height: 40}}
        />
      </View>
    </View>
  );
}
let myCordinates = {latitude: 11.93623, longitude: 108.445259};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchBox: {
    position: 'absolute',
    top: 55,
    flexDirection: 'row',
    backgroundColor: '#ffff',
    width: '92%',

    borderRadius: 5,

    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
});

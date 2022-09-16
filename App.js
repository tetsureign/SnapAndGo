import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Camera, useCameraDevices} from 'react-native-vision-camera';

async function GetPerms() {
  const cameraPermission = await Camera.getCameraPermissionStatus();
  const newCameraPermission = await Camera.requestCameraPermission();
}

const App = () => {
  GetPerms();

  const devices = useCameraDevices();
  const device = devices.back;

  if (device == null) {
    return <Text>No Device</Text>;
  }
  return (
    <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
  );
};

export default App;

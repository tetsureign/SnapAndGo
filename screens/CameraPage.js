/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/native';

async function GetPerms() {
  const cameraPermission = await Camera.getCameraPermissionStatus();
  const newCameraPermission = await Camera.requestCameraPermission();
}

const CameraPage = () => {
  GetPerms();

  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();

  if (device == null) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>No Device</Text>
      </View>
    );
  }
  return (
    <Camera
      style={(styles.camera, StyleSheet.absoluteFill)}
      device={device}
      isActive={isFocused}
    />
  );
};

const styles = StyleSheet.create({
  camera: {
    zIndex: 0,
  },
});

export default CameraPage;

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

async function GetPerms() {
  const cameraPermission = await Camera.getCameraPermissionStatus();
  const newCameraPermission = await Camera.requestCameraPermission();
}

const CameraPage = () => {
  GetPerms();

  const devices = useCameraDevices();
  const device = devices.back;

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
      isActive={true}
    />
  );
};

const styles = StyleSheet.create({
  camera: {
    zIndex: 0,
  },
});

export default CameraPage;

/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  View,
} from 'react-native';
import {Camera, CameraType} from 'expo-camera';
import {useIsFocused} from '@react-navigation/native';

const CameraPage = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const isFocused = useIsFocused();
  let camera = Camera;

  const __takePicture = async () => {
    if (!camera) {
      return;
    }
    const photo = await camera.takePictureAsync();
  };

  function toggleCameraType() {
    setType(current =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );
  }

  return (
    <View style={styles.container}>
      {isFocused && (
        <Camera
          style={styles.camera}
          type={type}
          ref={r => {
            camera = r;
          }}>
          <View style={styles.buttonContainer}>
            {/* <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity> */}
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              flexDirection: 'row',
              flex: 1,
              width: '100%',
              padding: 90,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                alignSelf: 'center',
                flex: 1,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={__takePicture}
                style={{
                  width: 70,
                  height: 70,
                  bottom: 0,
                  borderRadius: 50,
                  backgroundColor: '#fff',
                }}
              />
            </View>
          </View>
        </Camera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CameraPage;

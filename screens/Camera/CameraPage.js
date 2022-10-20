/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  View,
  Button,
  Dimensions,
  Platform,
} from 'react-native';
import {Camera, CameraType, setHasCameraPermission} from 'expo-camera';
import {useIsFocused} from '@react-navigation/native';

const CameraPage = ({navigation}) => {
  let camera = Camera;

  // Get permission
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  // Set capture stuff
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  // Check Focused
  const isFocused = useIsFocused();

  const __takePicture = async () => {
    if (!camera) {
      return;
    }
    const photo = await camera.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
    console.log(photo);

    navigation.navigate('Nhận diện', photo);
  };

  // Screen Ratio and image padding
  const [realCameraWidth, setRealCameraWidth] = useState(0);
  const [ratio, setRatio] = useState('4:3'); // default is 4:3
  const {height, width} = Dimensions.get('window');
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);

  // set the camera ratio and padding.
  // this code assumes a portrait mode screen
  const prepareRatio = async () => {
    let desiredRatio = '4:3'; // Start with the system default
    // This issue only affects Android
    if (Platform.OS === 'android') {
      const ratios = await camera.getSupportedRatiosAsync();

      // Calculate the width/height of each of the supported camera ratios
      // These width/height are measured in landscape mode
      // find the ratio that is closest to the screen ratio without going over
      let distances = {};
      let realRatios = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(':');
        const realRatio = parseInt(parts[0], 10) / parseInt(parts[1], 10);
        realRatios[ratio] = realRatio;
        // ratio can't be taller than screen, so we don't want an abs()
        const distance = screenRatio - realRatio;
        distances[ratio] = realRatio;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      // set the best match
      desiredRatio = minDistance;
      const realCameraWidth = Math.floor(
        (width * screenRatio) / realRatios[desiredRatio],
      );
      setRealCameraWidth(realCameraWidth);
      // set the preview padding and preview ratio
      setRatio(desiredRatio);
      // Set a flag so we don't do this
      // calculation each time the screen refreshes
      setIsRatioSet(true);
    }
  };

  // the camera must be loaded in order to access the supported ratios
  const setCameraReady = async () => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };

  return (
    <View style={styles.container}>
      {isFocused && (
        <Camera
          onCameraReady={setCameraReady}
          style={([styles.camera], {width: realCameraWidth, height: height})}
          type={type}
          ratio={ratio}
          ref={r => {
            camera = r;
          }}>
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
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    alignContent: 'center',
    zIndex: 0,
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

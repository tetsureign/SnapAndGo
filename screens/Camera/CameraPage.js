/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  View,
  Button,
} from 'react-native';
import {Camera, CameraType} from 'expo-camera';
import {useIsFocused} from '@react-navigation/native';

const CameraPage = ({navigation}) => {
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
    console.log(photo);
    setPreviewVisible(true);
    setCapturedImage(photo);

    navigation.navigate('Nhận diện', photo);
  };

  return (
    <View style={styles.container}>
      {isFocused && (
        <Camera
          style={styles.camera}
          type={type}
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
  },
  camera: {
    flex: 1,
    width: '100%',
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

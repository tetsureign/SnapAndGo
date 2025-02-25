import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  Dimensions,
  Platform,
  Image,
  Animated,
  Button,
} from 'react-native';
import {Camera, CameraType} from 'expo-camera';
import {useIsFocused} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useHeaderHeight} from '@react-navigation/elements';

import {FocusAwareStatusBar} from '../../components/FocusAwareStatusBar';
import {TakePictureButton, ImagePickerButton} from '../../components/Buttons';

import ResizeImage from '../../utils/resizeImage';

import styles from './CameraPage.styles';

const CameraPage = ({navigation}) => {
  let camera = Camera;

  const bottomTabHeight = useBottomTabBarHeight();

  // Get permission
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flashScreen, setFlashScreen] = useState(false);

  // Check Focused
  const isFocused = useIsFocused();

  const navigateToDetect = photo => {
    const photoUri = Image.resolveAssetSource(photo).uri;
    const photoWidth = Image.resolveAssetSource(photo).width;
    const photoHeight = Image.resolveAssetSource(photo).height;
    navigation.navigate('detect-page', {photoUri, photoWidth, photoHeight});
  };

  // Screen Ratio and image padding
  const [realCameraWidth, setRealCameraWidth] = useState(0);
  const [cameraRatio, setRatio] = useState('4:3'); // default is 4:3
  const {height, width} = Dimensions.get('window');
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          App cần quyền của bạn để hiển thị camera
        </Text>
        <Button onPress={requestPermission} title="Cấp quyền" />
      </View>
    );
  }

  // set the camera ratio and padding. Only needed for Android
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
      const realCameraWidthCalc = Math.floor(
        (width * screenRatio) / realRatios[desiredRatio],
      );
      setRealCameraWidth(realCameraWidthCalc);
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

  const FlashScreen = props => {
    const fadeAnim = useRef(new Animated.Value(1)).current; // Initial value for opacity: 0

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim]);

    return (
      <Animated.View // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim, // Bind opacity to animated value
        }}>
        {props.children}
      </Animated.View>
    );
  };

  const __takePicture = async () => {
    if (!camera) {
      return;
    }
    setFlashScreen(true);
    const photo = await camera.takePictureAsync();
    const resizedPhoto = await ResizeImage(photo.uri);
    setFlashScreen(false);
    navigateToDetect(resizedPhoto);
  };

  const __pickImage = async () => {
    const photo = await launchImageLibrary({mediaType: 'photo'});
    if (photo.didCancel === true) {
      return;
    }
    const resizedPhoto = await ResizeImage(photo.assets[0].uri);
    navigateToDetect(resizedPhoto);
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle={'light-content'} />
      {isFocused && (
        <Camera
          onCameraReady={setCameraReady}
          style={[styles.camera, {width: realCameraWidth}]}
          type={type}
          ratio={cameraRatio}
          ref={r => {
            camera = r;
          }}>
          {flashScreen && <FlashScreen style={styles.flashScreen} />}
          <View
            style={[styles.buttonsPositioner, {bottom: bottomTabHeight + 15}]}>
            <View style={styles.buttonsContainer}>
              <ImagePickerButton onPress={__pickImage} />

              <TakePictureButton onPress={__takePicture} />
              {/* TODO: Switch camera button here */}
              <View style={{width: 60}} />
            </View>
          </View>
        </Camera>
      )}
    </View>
  );
};

export default CameraPage;

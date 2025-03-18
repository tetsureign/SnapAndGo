import React, {useState, useRef} from 'react';
import {Text, View, Button} from 'react-native';
import {Camera, CameraType} from 'expo-camera/legacy';
import {useIsFocused} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import {TakePictureButton, ImagePickerButton} from '@/components/Buttons';
import {FlashScreen} from '@/components/Animation';

import ResizeImage from '@/utils/resizeImage';
import {useCameraRatio} from '@/hooks/useCameraRatio';

import styles from './CameraPage.styles';
import {DarkTheme} from '@/styles/theme';

import {PhotoResizeResult} from '@/types/photo';
import {CameraPageProps} from '@/types/navigation';

const CameraPage = ({navigation}: CameraPageProps) => {
  const cameraRef = useRef<Camera | null>(null);

  const bottomTabHeight = useBottomTabBarHeight();

  // Camera ratio
  const {realCameraWidth, cameraRatio, setCameraReady} = useCameraRatio();

  // Camera states
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  // Flash screen state
  const [flashScreen, setFlashScreen] = useState(false);

  // Only show the camera when the tab is focused
  const isFocused = useIsFocused();

  // Permission logic

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          App cần quyền của bạn để hiển thị camera
        </Text>
        <Button onPress={requestPermission} title="Cấp quyền" />
      </View>
    );
  }

  // Flash screen animation when capturing a picture
  // Might change later

  const takePicture = async () => {
    if (!cameraRef.current) {
      return;
    }
    setFlashScreen(true);
    const photo = await cameraRef.current.takePictureAsync();
    const resizedPhoto = await ResizeImage(photo.uri);
    setFlashScreen(false);
    navigateToDetect(resizedPhoto);
  };

  const pickImage = async () => {
    const photo = await launchImageLibrary({mediaType: 'photo'});
    if (photo.didCancel === true) {
      return;
    }
    const resizedPhoto = await ResizeImage(photo.assets[0].uri);
    navigateToDetect(resizedPhoto);
  };

  // Navigation logic
  const navigateToDetect = (photo: PhotoResizeResult) => {
    navigation.navigate('detect-page', {photo});
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle={'light-content'} />
      {isFocused && (
        <Camera
          onCameraReady={() => setCameraReady(cameraRef.current)}
          style={[styles.camera, {width: realCameraWidth}]}
          type={type}
          ratio={cameraRatio}
          ref={cameraRef}>
          {flashScreen && <FlashScreen style={styles.flashScreen} />}
          <View
            style={[
              styles.buttonsPositioner,
              {bottom: bottomTabHeight + DarkTheme.spacing.md},
            ]}>
            <View style={styles.buttonsContainer}>
              <ImagePickerButton onPress={pickImage} />

              <TakePictureButton onPress={takePicture} />

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

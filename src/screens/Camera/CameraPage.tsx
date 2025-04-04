import React, {useState, useRef} from 'react';
import {Text, View, Button} from 'react-native';
import {CameraView, CameraType, useCameraPermissions} from 'expo-camera';
import {useIsFocused} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import {TakePictureButton, ImagePickerButton} from '@/components/Buttons';

import ResizeImage from '@/utils/resizeImage';

import styles from './CameraPage.styles';
import {DarkTheme} from '@/styles/theme';

import {PhotoResizeResult} from '@/types/photo';
import {CameraPageProps} from '@/types/navigation';

const CameraPage = ({navigation}: CameraPageProps) => {
  const cameraRef = useRef<CameraView>(null);

  const bottomTabHeight = useBottomTabBarHeight();

  // Camera states
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

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

  const takePicture = async () => {
    if (!cameraRef.current) {
      return;
    }
    const photo = await cameraRef.current.takePictureAsync({
      shutterSound: false,
    });
    const resizedPhoto = await ResizeImage(photo.uri);
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
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
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
        </CameraView>
      )}
    </View>
  );
};

export default CameraPage;

import {CameraType, CameraView, useCameraPermissions} from 'expo-camera';
import {useRef, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';

import {CameraPageProps} from '@/types/navigation';
import {PhotoResizeResult} from '@/types/photo';
import ResizeImage from '@/utils/resizeImage';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useIsFocused} from '@react-navigation/native';

export function useCamera({navigation}: CameraPageProps) {
  const cameraRef = useRef<CameraView>(null);

  const bottomTabHeight = useBottomTabBarHeight();

  // Camera states
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  // Only show the camera when the tab is focused
  const isFocused = useIsFocused();

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

  return {
    cameraRef,
    bottomTabHeight,
    facing,
    permission,
    requestPermission,
    isFocused,
    takePicture,
    pickImage,
  };
}

import {CameraView} from 'expo-camera';
import React from 'react';
import {Button, Text, View} from 'react-native';

import {ImagePickerButton, TakePictureButton} from '@/components/Buttons';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import {DarkTheme} from '@/styles/theme';
import {CameraPageProps} from '@/types/navigation';

import styles from '@/screens/Camera/CameraPage.styles';
import {useCamera} from '@/screens/Camera/hooks/useCamera';

const CameraPage = ({navigation, route}: CameraPageProps) => {
  const {
    cameraRef,
    bottomTabHeight,
    facing,
    permission,
    requestPermission,
    isFocused,
    takePicture,
    pickImage,
  } = useCamera({navigation, route});

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

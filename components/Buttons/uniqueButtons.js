import React from 'react';
import {TouchableOpacity, Image, View} from 'react-native';
import {cameraButtonStyles} from './styles';

export function TakePictureButton({onPress}) {
  return (
    <TouchableOpacity
      style={cameraButtonStyles.captureButton}
      onPress={onPress}
    />
  );
}

export function ImagePickerButton({onPress}) {
  return (
    <View>
      <TouchableOpacity
        style={cameraButtonStyles.imgPickerButton}
        onPress={onPress}>
        <Image
          source={require('../../assets/icons/media-image.png')}
          style={cameraButtonStyles.imgPickerButtonIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

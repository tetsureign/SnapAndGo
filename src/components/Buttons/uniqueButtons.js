import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {MediaImage, Search} from 'iconoir-react-native';

import {cameraButtonStyles} from './styles';

export const TakePictureButton = ({onPress}) => {
  return (
    <TouchableOpacity
      style={cameraButtonStyles.captureButton}
      onPress={onPress}>
      <Search color="#00C5FF" width={30} height={30} />
    </TouchableOpacity>
  );
};

export const ImagePickerButton = ({onPress}) => {
  return (
    <View>
      <TouchableOpacity
        style={cameraButtonStyles.imgPickerButton}
        onPress={onPress}>
        <MediaImage color="white" width={30} height={30} />
      </TouchableOpacity>
    </View>
  );
};

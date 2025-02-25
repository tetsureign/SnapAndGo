import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {MediaImage} from 'iconoir-react-native';

import {styles} from './Button.styles';

type ImagePickerButtonProps = {
  onPress: () => void;
};

export const ImagePickerButton = ({onPress}: ImagePickerButtonProps) => {
  return (
    <View>
      <TouchableOpacity style={styles.imgPickerButton} onPress={onPress}>
        <MediaImage color="white" width={30} height={30} />
      </TouchableOpacity>
    </View>
  );
};

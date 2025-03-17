import React from 'react';
import {TouchableOpacity, View, TouchableOpacityProps} from 'react-native';
import {MediaImage} from 'iconoir-react-native';

import {styles} from './Button.styles';
import {BaseTheme} from '@/styles/theme';

const ImagePickerButton = (props: TouchableOpacityProps) => {
  return (
    <View>
      <TouchableOpacity style={styles.imgPickerButton} onPress={props.onPress}>
        <MediaImage
          color="white"
          width={BaseTheme.fontSize.xl}
          height={BaseTheme.fontSize.xl}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ImagePickerButton;

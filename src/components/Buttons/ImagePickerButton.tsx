import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {MediaImage} from 'iconoir-react-native';

import {styles} from './Button.styles';

interface ImagePickerButtonProps {
  onPress: () => void;
}

export const ImagePickerButton: React.FC<ImagePickerButtonProps> = ({
  onPress,
}) => {
  return (
    <View>
      <TouchableOpacity style={styles.imgPickerButton} onPress={onPress}>
        <MediaImage color="white" width={30} height={30} />
      </TouchableOpacity>
    </View>
  );
};

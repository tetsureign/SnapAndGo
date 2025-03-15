import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Search} from 'iconoir-react-native';

import {styles} from './Button.styles';
import {theme} from '@/styles/theme';

type TakePictureButtonProps = {
  onPress: () => void;
};

const TakePictureButton = ({onPress}: TakePictureButtonProps) => {
  return (
    <TouchableOpacity style={styles.captureButton} onPress={onPress}>
      <Search color={theme.colors.blue} width={30} height={30} />
    </TouchableOpacity>
  );
};

export default TakePictureButton;

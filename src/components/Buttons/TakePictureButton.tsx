import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Search} from 'iconoir-react-native';

import {styles} from './Button.styles';
import {colors} from '../../styles/colors';

type TakePictureButtonProps = {
  onPress: () => void;
};

const TakePictureButton = ({onPress}: TakePictureButtonProps) => {
  return (
    <TouchableOpacity style={styles.captureButton} onPress={onPress}>
      <Search color={colors.blue} width={30} height={30} />
    </TouchableOpacity>
  );
};

export default TakePictureButton;

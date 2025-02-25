import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Search} from 'iconoir-react-native';

import {styles} from './Button.styles';

interface TakePictureButtonProps {
  onPress: () => void;
}

// TODO: Global styleeeee

export const TakePictureButton: React.FC<TakePictureButtonProps> = ({
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.captureButton} onPress={onPress}>
      <Search color="#00C5FF" width={30} height={30} />
    </TouchableOpacity>
  );
};

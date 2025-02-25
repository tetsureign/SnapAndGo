import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {NavArrowUp, NavArrowDown} from 'iconoir-react-native';

import {styles} from './Button.styles';

interface ShowHideButtonProps {
  onPress: () => void;
  isOpened: boolean;
  text: string;
  color: string;
}

export const ShowHideButton: React.FC<ShowHideButtonProps> = ({
  onPress,
  isOpened,
  text,
  color,
}) => {
  let buttonSource: React.ReactElement | string = null;
  const buttonSize = 18;
  if (isOpened) {
    // buttonSource = require('../../assets/icons/nav-arrow-up.png');
    buttonSource = (
      <NavArrowUp color={color} width={buttonSize} height={buttonSize} />
    );
  } else {
    // buttonSource = require('../../assets/icons/nav-arrow-down.png');
    buttonSource = (
      <NavArrowDown color={color} width={buttonSize} height={buttonSize} />
    );
  }
  return (
    <TouchableOpacity style={styles.showHideButton} onPress={onPress}>
      <Text style={[styles.showHideButtonText, {color: color}]}>{text}</Text>

      {buttonSource}
      {/* Old way to render this button: use image
      <Image
        source={buttonSource}
        style={[styles.showHideButtonArrow, {tintColor: color}]}
      /> */}
    </TouchableOpacity>
  );
};

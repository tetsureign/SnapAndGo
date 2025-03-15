import React, {useEffect, useRef} from 'react';
import {Animated, ViewProps} from 'react-native';

const FlashScreen = (props: ViewProps) => {
  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View {...props} style={[props.style, {opacity: fadeAnim}]}>
      {props.children}
    </Animated.View>
  );
};

export default FlashScreen;

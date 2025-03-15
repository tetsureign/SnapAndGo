import React, {useEffect, useRef} from 'react';
import {Animated, ViewProps} from 'react-native';

const FlashScreen = (props: ViewProps) => {
  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial value for opacity: 1

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={[
        props.style,
        {
          opacity: fadeAnim, // Bind opacity to animated value
        },
      ]}>
      {props.children}
    </Animated.View>
  );
};

export default FlashScreen;

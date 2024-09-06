import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {SelectedResultContext} from '../../contexts/DetectionResultContext';

export const RectRender = ({element, index, isReliable}) => {
  const {
    selectedResultIndex,
    setSelectedResultIndex,
    setSelectedResult,
    resizeRatio,
  } = useContext(SelectedResultContext);
  return (
    <TouchableOpacity
      onPress={() => {
        if (selectedResultIndex === index) {
          setSelectedResultIndex(null);
          setSelectedResult(null);
        } else {
          setSelectedResultIndex(index);
          setSelectedResult(element.object);
        }
      }}
      key={index}
      style={[
        isReliable && styles.rectFade,
        selectedResultIndex === index && styles.rectWhite,
        // {
        //   position: 'absolute',
        //   width: (element.coordinate.x1 - element.coordinate.x0) * resizeRatio,
        //   height: (element.coordinate.y1 - element.coordinate.y0) * resizeRatio,
        //   left: element.coordinate.x0 * resizeRatio,
        //   top: element.coordinate.y0 * resizeRatio,
        // },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  rectFade: {
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 5,
    borderRadius: 10,
    shadowRadius: 4,
  },
  rectWhite: {
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 10,
    shadowRadius: 4,
  },
});

import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {SelectedResultContext} from '../../../contexts/DetectionResultContext';

export const RectRender = ({element, index, isReliable}) => {
  const {selectedResult, setSelectedResult, resizeRatio} = useContext(
    SelectedResultContext,
  );

  return (
    <TouchableOpacity
      onPress={() => {
        if (selectedResult.index === index) {
          setSelectedResult({
            result: null,
            index: null,
          });
        } else {
          setSelectedResult({
            result: element.class,
            index: index,
          });
        }
      }}
      key={index}
      style={[
        styles.rect,
        isReliable && styles.rectFade,
        selectedResult.index === index && styles.rectWhite,
        // YOLOv5
        // {
        //   width: (element.coordinate.x1 - element.coordinate.x0) * resizeRatio,
        //   height: (element.coordinate.y1 - element.coordinate.y0) * resizeRatio,
        //   left: element.coordinate.x0 * resizeRatio,
        //   top: element.coordinate.y0 * resizeRatio,
        // },
        {
          left: element.bbox[0] * resizeRatio,
          top: element.bbox[1] * resizeRatio,
          width: element.bbox[2] * resizeRatio,
          height: element.bbox[3] * resizeRatio,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  rect: {
    position: 'absolute',
  },
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

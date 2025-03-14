import {useState, useCallback} from 'react';
import {Platform, Dimensions} from 'react-native';
import {Camera} from 'expo-camera';

export function useCameraRatio() {
  const {height, width} = Dimensions.get('window');
  const screenRatio = height / width;

  const [cameraRatio, setRatio] = useState('4:3'); // default is 4:3
  const [realCameraWidth, setRealCameraWidth] = useState(0);

  const [isRatioSet, setIsRatioSet] = useState(false);

  const prepareRatio = useCallback(
    async (camera: Camera) => {
      let desiredRatio = '4:3'; // Start with the system default

      if (Platform.OS === 'android') {
        const ratios = await camera.getSupportedRatiosAsync();

        // Calculate the width/height of each of the supported camera ratios
        // These width/height are measured in landscape mode
        // find the ratio that is closest to the screen ratio without going over
        let distances = {};
        let realRatios = {};
        let minDistance = null;
        for (const ratio of ratios) {
          const parts = ratio.split(':');
          const realRatio = parseInt(parts[0], 10) / parseInt(parts[1], 10);
          realRatios[ratio] = realRatio;
          // ratio can't be taller than screen, so we don't want an abs()
          const distance = screenRatio - realRatio;
          distances[ratio] = realRatio;
          if (minDistance == null) {
            minDistance = ratio;
          } else {
            if (distance >= 0 && distance < distances[minDistance]) {
              minDistance = ratio;
            }
          }
        }
        // set the best match
        desiredRatio = minDistance;
        const realCameraWidthCalc = Math.floor(
          (width * screenRatio) / realRatios[desiredRatio],
        );
        setRealCameraWidth(realCameraWidthCalc);
        // set the preview padding and preview ratio
        setRatio(desiredRatio);
        // Set a flag so we don't do this
        // calculation each time the screen refreshes
        setIsRatioSet(true);
      }
    },
    [screenRatio, width],
  );

  // The camera must be loaded in order to access the supported ratios
  const setCameraReady = useCallback(
    async (camera: Camera) => {
      if (!isRatioSet) {
        await prepareRatio(camera);
      }
    },
    [isRatioSet, prepareRatio],
  );

  return {cameraRatio, realCameraWidth, setCameraReady};
}

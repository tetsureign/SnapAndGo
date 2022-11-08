/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  Button,
  Linking,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import axios from 'axios';
import LoadingIndicator from '../../components/LoadingIndicator';

const ImageDetectPage = ({route, navigation}) => {
  const {photo} = route.params;

  const [result, setResult] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isDetectPressed, setPressed] = useState(false);

  const FetchAPI = source => {
    let photoUpload = {uri: source.uri};
    let formData = new FormData();
    formData.append('file', {
      uri: photoUpload.uri,
      name: 'image.jpg',
      type: 'image/jpeg',
    });

    const baseUrl = 'http://35.78.235.36';

    return axios
      .post(`${baseUrl}/api/v1/yolo-obj-detect/images/detect`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log('From API: ', response.data);
        setResult(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const actionSheetRef = useRef(null);

  const __getResults = () => {
    setLoading(true);
    setPressed(true);
    FetchAPI(photo);
  };

  useEffect(() => {
    if (!isLoading && isDetectPressed) {
      actionSheetRef.current?.show();
    }
    // setLoading(true);
  }, [isLoading, isDetectPressed, photo, result]);

  const buttons = [];

  if (result) {
    result.forEach((element, index) => {
      buttons.push(
        <Button
          title={element}
          key={index}
          onPress={() => {
            Linking.openURL('http://maps.google.com/?q=' + element + ' shop');
          }}
        />,
      );
    });
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: photo && photo.uri}}
        style={styles.background}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={__getResults}
            title="Nhận diện"
            style={styles.button}
          />
        </View>
        {isLoading && <LoadingIndicator />}
      </ImageBackground>

      <ActionSheet ref={actionSheetRef} elevation={0}>
        <View style={styles.actionSheet}>{buttons}</View>
      </ActionSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  background: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 75,
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  actionSheet: {
    padding: 20,
  },
});

export default ImageDetectPage;

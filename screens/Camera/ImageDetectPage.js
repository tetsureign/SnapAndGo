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
  Image,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import axios from 'axios';
import LoadingIndicator from '../../components/LoadingIndicator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ImageDetectPage = ({route, navigation}) => {
  const {photo} = route.params;

  const [result, setResult] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isDetectPressed, setDetectPressed] = useState(false);
  const [selectedResultIndex, setSelectedResultIndex] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);

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
    setDetectPressed(true);
    FetchAPI(photo);
  };

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!isLoading && isDetectPressed) {
      actionSheetRef.current?.show();
    }
  }, [isLoading, isDetectPressed, photo, result, insets.bottom]);

  const buttons = [];
  let itemsCount = 0;

  if (result) {
    result.forEach((element, index) => {
      buttons.push(
        <TouchableOpacity
          style={styles.detectedItemsButton}
          key={index}
          onPress={() => {
            setSelectedResultIndex(index);
            setSelectedResult(element);
          }}>
          <View>
            {selectedResultIndex === index && (
              <View style={styles.selectedItemBackground} />
            )}
            <Text style={styles.itemsText}>{element}</Text>
          </View>
        </TouchableOpacity>,
      );
      itemsCount++;
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

      <ActionSheet
        ref={actionSheetRef}
        backgroundInteractionEnabled={true}
        containerStyle={styles.actionSheet}
        useBottomSafeAreaPadding={true}
        headerAlwaysVisible={true}
        gestureEnabled={true}
        indicatorStyle={{marginTop: 15, width: 60}}>
        <View style={styles.actionSheetItems}>
          {buttons}
          {selectedResult && (
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => {
                Linking.openURL(
                  'http://maps.google.com/?q=' + selectedResult + ' shop',
                );
              }}>
              <View style={styles.searchButtonViewInside}>
                <Image
                  source={require('../../assets/icons/search.png')}
                  style={{
                    width: 40,
                    height: 40,
                    tintColor: '#00C5FF',
                  }}
                />
                <Text style={styles.searchText}>Tìm kiếm</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
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
  selectedItemBackground: {
    backgroundColor: '#646464',
    borderWidth: 1,
    borderColor: '#858585',
    borderRadius: 10,
    height: 40,
    marginBottom: -40,
  },
  itemsText: {
    fontSize: 25,
    color: 'white',
    paddingLeft: 5,
    paddingRight: 5,
  },
  searchButton: {
    height: 40,
    marginTop: 5,
    marginBottom: 5,
  },
  searchButtonViewInside: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchText: {
    fontSize: 25,
    color: '#00C5FF',
    paddingLeft: 5,
  },
  actionSheet: {
    backgroundColor: '#434343',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  actionSheetItems: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 75,
  },
  detectedItemsButton: {
    paddingTop: 5,
    paddingBottom: 5,
  },
});

export default ImageDetectPage;

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
  Touchable,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import axios from 'axios';
import LoadingIndicator from '../../components/LoadingIndicator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ImageDetectPage = ({route, navigation}) => {
  const photoUri = route.params;

  const [result, setResult] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isDetectPressed, setDetectPressed] = useState(false);
  const [selectedResultIndex, setSelectedResultIndex] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const [isSuccess, setSuccess] = useState(false);
  const [isUnreliableResultsOpened, setUnreliableResultsOpened] =
    useState(false);

  const actionSheetRef = useRef(null);
  const insets = useSafeAreaInsets();

  const FetchAPI = source => {
    let photoUpload = {uri: source};
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
        setSuccess(true);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setSuccess(false);
        setLoading(false);
      });
  };

  const __getResults = () => {
    setLoading(true);
    setDetectPressed(true);
    FetchAPI(photoUri);
  };

  const __unreliableResultsCollapse = () => {
    if (isUnreliableResultsOpened === false) {
      setUnreliableResultsOpened(true);
    } else {
      setUnreliableResultsOpened(false);
    }
  };

  const buttons = [];
  const buttonsLow = [];
  let itemsCount = 0;
  let itemsLowCount = 0;

  const ItemsButtonRender = ({element, index, isReliable}) => {
    return (
      <TouchableOpacity
        style={styles.detectedItemsButton}
        key={index}
        onPress={() => {
          setSelectedResultIndex(index);
          setSelectedResult(element.object);
        }}>
        {selectedResultIndex === index && (
          <View style={styles.selectedItemBackground} />
        )}
        <View style={styles.itemsTextContainer}>
          <Text
            style={[
              styles.itemsText,
              isReliable ? styles.itemsTextWhite : styles.itemsTextFade,
              selectedResultIndex === index && styles.itemsTextWhite,
            ]}>
            {element.object}
          </Text>
          <Text
            style={[
              styles.itemsText,
              isReliable ? styles.itemsTextWhite : styles.itemsTextFade,
              selectedResultIndex === index && styles.itemsTextWhite,
            ]}>
            {element.score}%
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (result) {
    result.forEach((element, index) => {
      if (element.score >= 70) {
        buttons.push(
          <ItemsButtonRender
            element={element}
            index={index}
            isReliable={true}
          />,
        );
      } else {
        itemsLowCount++;
        buttonsLow.push(
          <ItemsButtonRender
            element={element}
            index={index}
            isReliable={false}
          />,
        );
      }
      itemsCount++;
    });
  }

  useEffect(() => {
    if (!isLoading && isDetectPressed) {
      actionSheetRef.current?.show();
    }
  }, [isLoading, isDetectPressed, photoUri, result, insets.bottom]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: photoUri}}
        style={styles.background}
        resizeMode={'contain'}>
        {isSuccess && (
          <View>
            <Text>
              Đã tìm thấy sản phẩm! Vui lòng chọn kết quả bạn muốn sử dụng.
            </Text>
          </View>
        )}
        {result === null && (
          <View style={styles.buttonContainer}>
            <Button
              onPress={__getResults}
              title="Nhận diện"
              style={styles.button}
            />
          </View>
        )}
        {isLoading && <LoadingIndicator />}
      </ImageBackground>

      <ActionSheet
        ref={actionSheetRef}
        backgroundInteractionEnabled={true}
        containerStyle={styles.actionSheet}
        useBottomSafeAreaPadding={true}
        headerAlwaysVisible={true}
        gestureEnabled={true}
        closable={false}
        indicatorStyle={{marginTop: 15, width: 60}}>
        <View style={styles.actionSheetItems}>
          {buttons}
          {itemsLowCount >= 1 && (
            <TouchableOpacity
              style={styles.unreliableResultsButton}
              onPress={__unreliableResultsCollapse}>
              <Text style={styles.unreliableResultsButtonText}>
                Kết quả có độ chính xác thấp
              </Text>
              {isUnreliableResultsOpened ? (
                <Image
                  source={require('../../assets/icons/nav-arrow-up.png')}
                  style={styles.unreliableResultsArrow}
                />
              ) : (
                <Image
                  source={require('../../assets/icons/nav-arrow-down.png')}
                  style={styles.unreliableResultsArrow}
                />
              )}
            </TouchableOpacity>
          )}
          {isUnreliableResultsOpened && buttonsLow}
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
  // General
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: '#212121',
  },

  // Outside Actionsheet
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

  // Actionsheet area
  //   Results
  selectedItemBackground: {
    backgroundColor: '#646464',
    borderWidth: 1,
    borderColor: '#858585',
    borderRadius: 10,
    height: 40,
    marginBottom: -40,
  },
  itemsTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemsText: {
    fontSize: 25,
    paddingHorizontal: 5,
  },
  itemsTextWhite: {
    color: 'white',
  },
  itemsTextFade: {
    color: 'rgba(255, 255, 255, 0.25)',
  },
  detectedItemsButton: {
    paddingVertical: 5,
  },

  //   Unreliable results
  unreliableResultsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unreliableResultsButtonText: {
    color: '#C7C7C7',
    fontSize: 15,
  },
  unreliableResultsArrow: {
    width: 18,
    height: 18,
    tintColor: '#C7C7C7',
    marginHorizontal: 5,
  },

  //   Search button
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

  //   Actionsheet styles
  actionSheet: {
    backgroundColor: '#434343',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  actionSheetItems: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 75,
  },
});

export default ImageDetectPage;

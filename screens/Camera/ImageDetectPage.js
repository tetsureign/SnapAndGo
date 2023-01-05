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
  ScrollView,
} from 'react-native';
import ActionSheet, {
  useScrollHandlers,
  ActionSheetRef,
} from 'react-native-actions-sheet';
import axios from 'axios';
import {useHeaderHeight} from '@react-navigation/elements';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import LoadingIndicator from '../../components/LoadingIndicator';
import {FocusAwareStatusBar} from '../../components/FocusAwareStatusBar';
import {ref, set, update, onValue, remove} from 'firebase/database';
import {db} from '../../components/firebase';

const ImageDetectPage = ({route, navigation}) => {
  const {photoUri, photoWidth, photoHeight} = route.params;

  const headerHeight = useHeaderHeight();
  const bottomTabHeight = useBottomTabBarHeight();

  const resultsActionSheetRef = useRef(null);
  const infoActionSheetRef = useRef(null);
  const scrollHandlers = useScrollHandlers('scrollview-1', infoActionSheetRef);

  const [result, setResult] = useState(null);

  const [isLoading, setLoading] = useState(false);

  const [resizeRatio, setResizeRatio] = useState(null);
  const [imageWidthDevice, setImageWidthDevice] = useState(null);
  // const [imageHeightDevice, setImageHeightDevice] = useState(null);

  const [isDetectPressed, setDetectPressed] = useState(false);
  const [selectedResultIndex, setSelectedResultIndex] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const [isResultsActionsheetOpened, setResultsActionsheetOpened] =
    useState(false);
  const [isInfoActionsheetOpened, setInfoActionsheetOpened] = useState(false);
  const [isUnreliableResultsOpened, setUnreliableResultsOpened] =
    useState(false);

  const [description, setDescription] = useState('');

  const [errorCode, setErrorCode] = useState(null);

  const buttons = [];
  const buttonsLow = [];
  const rectRegions = [];
  const rectRegionsLow = [];
  let itemsLowCount = 0;

  const FetchAPI = async source => {
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
        setErrorCode(200);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setErrorCode(500);
        setLoading(false);
      });
  };

  const ItemsButtonRender = ({element, index, isReliable}) => {
    return (
      <TouchableOpacity
        style={styles.detectedItemsButton}
        key={index}
        onPress={() => {
          if (selectedResultIndex === index) {
            setSelectedResultIndex(null);
            setSelectedResult(null);
          } else {
            setSelectedResultIndex(index);
            setSelectedResult(element.object);
          }
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

  const RectRender = ({element, index, isReliable}) => {
    return (
      <View
        key={index}
        style={[
          isReliable && styles.rectFade,
          selectedResultIndex === index && styles.rectWhite,
          {
            position: 'absolute',
            width:
              (element.coordinate.x1 - element.coordinate.x0) * resizeRatio,
            height:
              (element.coordinate.y1 - element.coordinate.y0) * resizeRatio,
            left: element.coordinate.x0 * resizeRatio,
            top: element.coordinate.y0 * resizeRatio,
          },
        ]}
      />
    );
  };

  if (errorCode === 200) {
    if (result && result.length >= 1) {
      result.map((element, index) => {
        if (element.score >= 70) {
          buttons.push(
            <ItemsButtonRender
              element={element}
              index={index}
              key={index}
              isReliable={true}
            />,
          );
          rectRegions.push(
            <RectRender
              element={element}
              index={index}
              key={index}
              isReliable={true}
            />,
          );
        } else {
          itemsLowCount++;
          buttonsLow.push(
            <ItemsButtonRender
              element={element}
              index={index}
              key={index}
              isReliable={false}
            />,
          );
          rectRegionsLow.push(
            <RectRender
              element={element}
              index={index}
              key={index}
              isReliable={false}
            />,
          );
        }
      });
    } else if (result.length === 0) {
      setErrorCode(400);
    }
  }

  const errorSwitch = () => {
    switch (errorCode) {
      case 200:
        return (
          <Text style={styles.errorMessage}>
            Đã tìm thấy sản phẩm! Vui lòng chọn kết quả bạn muốn sử dụng.
          </Text>
        );
      case 400:
        return (
          <Text style={styles.errorMessage}>
            Không tìm thấy sản phẩm! Vui lòng thử lại.
          </Text>
        );
      case 500:
        return (
          <Text style={styles.errorMessage}>Không thể kết nối đến server.</Text>
        );
      default:
        return null;
    }
  };

  const __getResults = () => {
    setLoading(true);
    setDetectPressed(true);
    FetchAPI(photoUri);
  };

  const __goBack = () => {
    navigation.navigate('Trang Camera');
  };

  const __showResults = () => {
    resultsActionSheetRef.current?.show();
    setResultsActionsheetOpened(true);
  };

  const __unreliableResultsCollapse = () => {
    if (isUnreliableResultsOpened === false) {
      setUnreliableResultsOpened(true);
    } else {
      setUnreliableResultsOpened(false);
    }
  };

  const __showInfoData = () => {
    const starCountRef = ref(db, 'Objects/' + selectedResult);
    onValue(starCountRef, snapshot => {
      const data = snapshot.val();
      console.log(data);
      setDescription(data.Description);
    });
    infoActionSheetRef.current?.show();
    setInfoActionsheetOpened(true);
    resultsActionSheetRef.current?.hide();
  };

  const __closeDesc = () => {
    infoActionSheetRef.current?.hide();
    setInfoActionsheetOpened(false);
    resultsActionSheetRef.current?.show();
    setResultsActionsheetOpened(true);
  };

  useEffect(() => {
    if (!isLoading && isDetectPressed && errorCode === 200) {
      resultsActionSheetRef.current?.show();
      setResultsActionsheetOpened(true);
    }
  }, [isLoading, isDetectPressed, errorCode]);

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle={'light-content'} />
      <ImageBackground
        source={{uri: photoUri}}
        style={styles.background}
        resizeMode={'contain'}
        onLayout={event => {
          const {width} = event.nativeEvent.layout;
          setResizeRatio(width / photoWidth);
          setImageWidthDevice(width);
        }}>
        {errorCode && (
          <View style={styles.errorContainer}>
            <View
              style={[
                errorCode === 200
                  ? styles.errorBackgroundSuccess
                  : styles.errorBackgroundError,
                {marginTop: headerHeight + 15},
              ]}>
              {errorSwitch()}
            </View>
          </View>
        )}

        {result && (
          <View style={styles.rectContainer}>
            <View
              style={{
                width: imageWidthDevice,
                height: photoHeight * resizeRatio,
              }}>
              {rectRegions}
              {rectRegionsLow}
            </View>
          </View>
        )}

        {result === null ? (
          <View style={[styles.buttonContainer, {bottom: bottomTabHeight}]}>
            <Button
              onPress={__getResults}
              title="Nhận diện"
              style={styles.button}
            />
          </View>
        ) : (
          errorCode === 400 && (
            <View style={[styles.buttonContainer, {bottom: bottomTabHeight}]}>
              <Button
                onPress={__goBack}
                title="Thử chụp hình lại"
                style={styles.button}
              />
            </View>
          )
        )}

        {isResultsActionsheetOpened === false &&
          isInfoActionsheetOpened === false &&
          errorCode === 200 && (
            <View style={[styles.buttonContainer, {bottom: bottomTabHeight}]}>
              <Button
                onPress={__showResults}
                title="Danh sách kết quả"
                style={styles.button}
              />
            </View>
          )}
        {isLoading && <LoadingIndicator />}
      </ImageBackground>

      <ActionSheet
        ref={resultsActionSheetRef}
        backgroundInteractionEnabled={true}
        containerStyle={styles.actionSheet}
        // useBottomSafeAreaPadding={true}
        headerAlwaysVisible={true}
        gestureEnabled={true}
        closable={true}
        indicatorStyle={{marginTop: 15, width: 60}}
        onClose={() => {
          setResultsActionsheetOpened(false);
        }}>
        <View
          style={[
            styles.actionSheetItems,
            {paddingBottom: bottomTabHeight + 15},
          ]}>
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
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.searchButton}
                onPress={__showInfoData}>
                <View style={styles.searchButtonViewInside}>
                  <Image
                    source={require('../../assets/icons/desc.png')}
                    style={{
                      width: 40,
                      height: 40,
                      tintColor: '#5FC314',
                    }}
                  />
                  <Text style={styles.descButton}>Thông tin</Text>
                </View>
              </TouchableOpacity>
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
            </View>
          )}
        </View>
      </ActionSheet>

      <ActionSheet
        ref={infoActionSheetRef}
        backgroundInteractionEnabled={true}
        containerStyle={styles.actionSheet}
        useBottomSafeAreaPadding={true}
        headerAlwaysVisible={true}
        gestureEnabled={true}
        closable={true}
        indicatorStyle={{marginTop: 15, width: 60}}
        onClose={() => {
          setInfoActionsheetOpened(false);
          setResultsActionsheetOpened(true);
          resultsActionSheetRef.current?.show();
        }}>
        <View
          style={[styles.actionSheetItems, {paddingBottom: bottomTabHeight}]}>
          <TouchableOpacity style={styles.searchButton} onPress={__closeDesc}>
            <View style={styles.searchButtonViewInside}>
              <Image
                source={require('../../assets/icons/back.png')}
                style={{
                  width: 40,
                  height: 40,
                  tintColor: '#00C5FF',
                }}
              />
              <Text style={styles.searchText}>Trở về danh sách</Text>
            </View>
          </TouchableOpacity>
          <ScrollView {...scrollHandlers}>
            <Text style={styles.descTitle}>{selectedResult}</Text>
            <Text style={styles.desc}>{description}</Text>
          </ScrollView>
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

  // Error messages area
  errorContainer: {
    position: 'absolute',
    alignSelf: 'center',
    left: 0,
    right: 0,
  },
  errorBackgroundSuccess: {
    backgroundColor: '#5FC314',
    marginHorizontal: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  errorBackgroundError: {
    backgroundColor: '#FF6901',
    marginHorizontal: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  errorMessage: {
    color: 'white',
    textAlign: 'center',
  },

  // Outside Actionsheet
  //   Rect region style
  rectContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  rectWhite: {
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 10,
    shadowRadius: 4,
  },
  rectFade: {
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 5,
    borderRadius: 10,
    shadowRadius: 4,
  },

  //   Detect button
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    // flex: 1,
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  searchButton: {
    height: 40,
    marginTop: 5,
    marginBottom: 5,
  },
  searchButtonViewInside: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchText: {
    fontSize: 25,
    color: '#00C5FF',
    paddingLeft: 5,
  },
  descButton: {
    fontSize: 25,
    color: '#5FC314',
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
    // paddingBottom: 75,
  },

  //   Desc Actionsheet
  descTitle: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 20,
    color: 'white',
  },
});

export default ImageDetectPage;

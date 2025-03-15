import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PhotoResizeResult} from './photo';

export type CameraStackParamList = {
  'main-camera': undefined;
  'detect-page': {photo: PhotoResizeResult};
};

export type CameraPageProps = NativeStackScreenProps<
  CameraStackParamList,
  'main-camera'
>;

export type ImageDetectPageProps = NativeStackScreenProps<
  CameraStackParamList,
  'detect-page'
>;

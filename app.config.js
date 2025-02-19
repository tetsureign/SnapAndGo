module.exports = ({config}) => {
  return {
    ...config,
    expo: {
      android: {
        package: 'com.snapandgo',
        permissions: [
          'android.permission.CAMERA',
          'android.permission.READ_EXTERNAL_STORAGE',
          'android.permission.INTERNET',
        ],
        config: {
          googleMaps: {
            apiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          },
        },
      },
      ios: {
        config: {
          googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
        },
      },
    },
  };
};

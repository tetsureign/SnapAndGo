/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const {getDefaultConfig} = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// config.resolver.assetExts.push('ort');

module.exports = config;
// module.exports = {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: true,
//       },
//     }),
//   },
//   defaultConfig,
// };

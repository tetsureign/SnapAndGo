import ImageResizer from '@bam.tech/react-native-image-resizer';

export default async function ResizeImage(image) {
  try {
    let result = await ImageResizer.createResizedImage(
      image,
      720,
      720,
      'JPEG',
      100,
      0,
      undefined,
      false,
      {
        mode: 'contain',
      },
    );
    return result;
  } catch (error) {
    console.log(error);
    // throw new Error(error);
  }
}

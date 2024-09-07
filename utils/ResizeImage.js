import ImageResizer from '@bam.tech/react-native-image-resizer';

export default async function ResizeImage(image) {
  try {
    let result = await ImageResizer.createResizedImage(
      image,
      1280,
      1280,
      'JPEG',
      95,
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

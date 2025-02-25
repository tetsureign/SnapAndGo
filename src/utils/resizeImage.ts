import ImageResizer from '@bam.tech/react-native-image-resizer';

interface ResizeResult {
  uri: string;
  path: string;
  name: string;
  size: number;
  width: number;
  height: number;
}

export default async function ResizeImage(
  image: string,
): Promise<ResizeResult | undefined> {
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
    console.error(error);
    // throw new Error(error);
  }
}

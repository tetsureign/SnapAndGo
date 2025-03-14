import ImageResizer from '@bam.tech/react-native-image-resizer';
import {PhotoResizeResult} from '@/types/photoResizeResult';

export default async function ResizeImage(
  image: string,
): Promise<PhotoResizeResult | undefined> {
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

import axiosInstance from '../axiosInstance';

const uriToBlob = async (uri: string): Promise<Blob> => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

export const imageDetect = async (imageUri: string) => {
  const formData = new FormData();
  const imageBlob = await uriToBlob(imageUri);
  formData.append('image', imageBlob, 'image.jpg');

  return axiosInstance.post('/detect', formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};

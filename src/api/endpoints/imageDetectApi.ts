import axiosInstance from '@/api/axiosInstance';

export const imageDetect = async (imageUri: string) => {
  const formData = new FormData();
  // Note to self: change 'image' to 'file' when testing using the FastAPI microservice
  formData.append('image', {
    uri: imageUri,
    name: 'image.jpg',
    type: 'image/jpeg',
  } as any);
  // The 'as any' is a workaround so that TypeScript doesn't complain about the FormData.append method.
  // Axios accepts Blob, but not React Native's uri

  const response = await axiosInstance.post('/detect', formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });

  return response.data;
};

import axios from 'axios';

const req = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 1000,
});

const handleResponse = res => {
  // console.log(res);
  if (res) {
    switch (res.status) {
      ///2xx
      case 200:
        return res.data;
      case 201:
        return res.data;
      /// 4xx
      case 401:
        return;
      default:
        return null;
    }
  }
};

export async function Get(path, option = {}) {
  try {
    const res = await req.get(path, option);
    return handleResponse(res);
  } catch (error) {
    if (error.response) return handleResponse(error.response);
  }
}

export async function Post(path, data, option = {}) {
  try {
    const res = await req.post(path, data, option);
    return handleResponse(res);
  } catch (error) {
    console.error(error);
    if (error.response) return handleResponse(error.response);
  }
}

export async function Put(path, data, option = {}) {
  try {
    const res = await req.put(path, data, option);
    return handleResponse(res);
  } catch (error) {
    if (error.response) return handleResponse(error.response);
  }
}

export async function Delete(path, option = {}) {
  try {
    const res = await req.delete(path, option);
    return handleResponse(res);
  } catch (error) {
    if (error.response) return handleResponse(error.response);
  }
}

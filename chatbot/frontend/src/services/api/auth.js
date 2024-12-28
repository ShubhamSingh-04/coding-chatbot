import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

export const login = async (userName, password) => {
    const data = { userName, password };
  const response = await axios.post(`${baseURL}/api/auth/login`, data);
  return {status: response.data.status , userID: response.data.userID, error: response.data.error, message: response.data.message};
};

export const register = async (userName, email, password) => {
    const data = { userName, email, password };
  const response = await axios.post(`${baseURL}/api/auth/register`, data);

  return {status: response.data.status , userID: response.data.userID, error: response.data.error, message: response.data.message};
};  
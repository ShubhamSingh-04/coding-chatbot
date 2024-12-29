import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

export const login = async (userName, password) => {
  const data = { userName, password };
  let response;
  try {
    response = await axios.post(`${baseURL}/api/auth/login`, data);
    return { status: response.data.status, userID: response.data.userID, message: response.data.message };

  } catch (error) {
    console.error('Error during login at auth.js:', error);
    if(error.response)
      return { status: error.response.status, error: error.response.error };
  }
};

export const register = async (userName, email, password) => {
  const data = { userName, email, password };
  let response;
  try {
    response = await axios.post(`${baseURL}/api/auth/register`, data);

    return { status: response.data.status, userID: response.data.userID, message: response.data.message };

  } 
  catch (error) {
    console.error('Error during registration at auth.js:', error);

    // Check if the error object contains a response
    if (error.response) {
      return {
        status: error.response.status,
        error: error.response.data.error || 'Unknown error',
        message: error.response.data.message || 'An error occurred',
      };
    }
  }
};  
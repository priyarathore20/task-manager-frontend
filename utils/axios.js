import axios from 'axios';

//defining base url
const baseURL = 'https://pets-care-backend.vercel.app/api';

// Create Axios instance
const instance = axios.create({
  baseURL,
  timeout: 10000,
});

export default instance;

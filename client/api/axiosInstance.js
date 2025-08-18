import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // ✅ Use environment variable for base URL
    withCredentials: true  // ✅ Send cookies with requests
});

export default axiosInstance;
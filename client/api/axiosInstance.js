import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
    withCredentials: true  // ✅ Send cookies with requests
});

export default axiosInstance;
// services/ApiService.ts

import axios from 'axios';

const BASE_URL = 'https://l6grth4303.execute-api.us-east-1.amazonaws.com/Prod/';
const API_KEY = 'YOUR_API_KEY';

export const ApiService = axios.create({
  baseURL: BASE_URL,
  headers: {
        'Content-Type': 'application/json',
    },
});

export default ApiService;

// services/ApiService.ts

import axios from 'axios';

const BASE_URL = 'BASE_URL';
const API_KEY = 'YOUR_API_KEY';

export const ApiService = axios.create({
  baseURL: BASE_URL,
  headers: {
        'Content-Type': 'application/json',
    },
});

export default ApiService;
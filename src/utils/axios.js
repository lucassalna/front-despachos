// src/axios.js o donde lo configures
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ec2-3-140-254-107.us-east-2.compute.amazonaws.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-abalife.onrender.com/usuarios',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

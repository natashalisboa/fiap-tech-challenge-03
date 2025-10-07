import axios from 'axios';

//TODO: não deixar exposto a URL da API
const api = axios.create({
  baseURL: 'http://localhost:3000'
});

export default api;

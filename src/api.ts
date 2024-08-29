import axios from 'axios';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiZnVsYW5vQHRlc3RlLmNvbSIsImlhdCI6MTcyNDk1OTM5MywiZXhwIjoxNzI0OTYxMTkzfQ.Ljyt7ouJyI1FedhACt8ib7QnSlQr0cfIIzCXd3SOpzo'

const http = axios.create({
  baseURL: 'http://localhost/',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

export const api = {
  pingPong: async () => {
    try {
      let response = await http.get('/ping');
      return response.data;
    } catch (error) {
      console.error('Erro ao retornar o pong:');
      throw error;
    }
  },
  getAllTask: async () => {
    try {
      let response = await http.get('/task/list');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar as tarefas:');
      throw error;
    }
  },
  addNewPost: async (title: string, body: string, userId: number) => {
    let response = await http.post('/posts', { title, body, userId });
    return response.data;
  }
}
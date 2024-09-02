import axios from 'axios';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiZnVsYW5vQHRlc3RlLmNvbSIsImlhdCI6MTcyNTI5NjkyMSwiZXhwIjoxNzI1Mjk4NzIxfQ.FiX5vFDlFuAc9Hyw1pxzX5gkyq2dnQD76UvWbb1qo_o'

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
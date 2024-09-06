import axios from 'axios';

const token = sessionStorage.getItem('authToken');

const teste = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiZnVsYW5vQHRlc3RlLmNvbSIsImlhdCI6MTcyNTI5NjkyMSwiZXhwIjoxNzI1Mjk4NzIxfQ.FiX5vFDlFuAc9Hyw1pxzX5gkyq2dnQD76UvWbb1qo_o'


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
  register: async (email: string, nome: string, senha: string) => {
    try {
      let response = await http.post('/signup', new URLSearchParams({ email, nome, senha }))
      return response.data
    } catch (error) {
      console.error('Erro ao criar usuario');
      throw error;
    }
  },
  login: async (email: string, senha: string) => {
    try {
      let response = await http.post('/signin', new URLSearchParams({ email, senha }))
      return response.data
    } catch (error) {
      console.error('Erro ao entrar com usuario');
      throw error;
    }
  },
  getAllTask: async () => {
    try {
      let response = await http.get('/task/list');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar as tarefas');
      throw error;
    }
  },
  createTask: async (titulo: string, descricao: string, userId: string) => {
    try {
      let response = await http.post('/task/create', new URLSearchParams({ titulo, descricao, userId }))
      return response.data
    } catch (error) {
      console.error('Erro ao criar usuario');
      throw error;
    }
  }
}
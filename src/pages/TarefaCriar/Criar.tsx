import { ChangeEvent, useState } from 'react';
import style from './Criar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../api';
import { useAuth } from '../../context/AuthContext';

export const Criar = () => {

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('')
  const [error, setError] = useState('');

  const { userId } = useAuth();
  const navigate = useNavigate();

  const handleForm = {
    titulo: (e: ChangeEvent<HTMLInputElement>) => setTitulo(e.target.value),
    descricao: (e: ChangeEvent<HTMLInputElement>) => setDescricao(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!titulo || !descricao) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    try {
      if (userId != null) {
        await api.createTask(titulo, descricao, userId)
        setError('');
        setTitulo('');
        setDescricao('');
        navigate('/tarefa/lista')
      }

    } catch (error) {
      console.error('Erro ao entrar com usuário:', error);
      setError('Erro ao entrar com usuário. Tente novamente.');
    }
  }

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título da tarefa</label>
          <input
            type="text"
            className="form-control"
            onChange={handleForm.titulo}
            value={titulo}
          />

        </div>
        <div className="mb-3">
          <label className="form-label">Descrição da tarefa</label>
          <input
            type="text"
            className="form-control"
            onChange={handleForm.descricao}
            value={descricao}
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-sm btn btn-primary">Criar</button>
      </form>
      <Link to="/tarefa/lista"><button className="btn btn-sm btn btn-outline-primary">Voltar</button></Link>
    </div>
  )
}
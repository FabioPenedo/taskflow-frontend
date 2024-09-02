import { ChangeEvent, useState } from 'react';
import style from './Registrar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../api';

export const Registrar = () => {

  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate()

  const handleForm = {
    email: (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    nome: (e: ChangeEvent<HTMLInputElement>) => setNome(e.target.value),
    senha: (e: ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário de recarregar a página

    // Verifica se todos os campos estão preenchidos
    if (!email || !nome || !senha) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    try {
      const response = await api.register(email, nome, senha)
      setError(''); // Limpa a mensagem de erro se o registro for bem-sucedido
      setEmail('')
      setNome('')
      setSenha('')
      navigate('/')
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      setError('Erro ao registrar usuário. Tente novamente.');
    }
  }

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            onChange={handleForm.email}
            value={email}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            onChange={handleForm.nome}
            value={nome}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            onChange={handleForm.senha}
            value={senha}
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-sm btn btn-primary">Criar</button>
      </form>
      <Link to="/"><button className="btn btn-sm btn btn-outline-primary">Ir para Logar</button></Link>
    </div>
  )
}

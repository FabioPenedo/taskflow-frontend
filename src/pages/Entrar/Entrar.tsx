import style from './Entrar.module.css';
import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../api';
import { useAuth } from '../../context/AuthContext';

export const Entrar = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const { login, handleUserId } = useAuth();
  const navigate = useNavigate();

  const handleForm = {
    email: (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    senha: (e: ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário de recarregar a página

    // Verifica se todos os campos estão preenchidos
    if (!email || !senha) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    try {
      const response = await api.login(email, senha)
      login(response.token);
      handleUserId(response.id)

      // Limpa a mensagem de erro e os campos do formulário
      setError('');
      setEmail('');
      setSenha('');

      navigate('/tarefa/lista')

    } catch (error) {
      console.error('Erro ao entrar com usuário:', error);
      setError('Erro ao entrar com usuário. Tente novamente.');
    }
  }

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="Email"
            className="form-control"
            onChange={handleForm.email}
            value={email}
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
        <button type="submit" className="btn btn-sm btn btn-primary">Entrar</button>
      </form>
      <Link to="/registrar"><button className="btn btn-sm btn btn-outline-primary">Ir para Registrar</button></Link>
    </div>
  )
}
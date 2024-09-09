import { ChangeEvent, useEffect, useState } from 'react';
import style from './Editar.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Task } from "../../types/Tasks";
import { api } from '../../api';

export const Editar = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('')
  const [concluido, setConcluida] = useState(false);

  const navigate = useNavigate();

  const handleForm = {
    titulo: (e: ChangeEvent<HTMLInputElement>) => setTitulo(e.target.value),
    descricao: (e: ChangeEvent<HTMLInputElement>) => setDescricao(e.target.value),
    concluido: (e: ChangeEvent<HTMLInputElement>) => setConcluida(e.target.checked)
  }


  const { id } = useParams(); // Acessa o id passado pela URL

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    if (id !== undefined) {
      let json = await api.getTaskById(id)

      setTitulo(json.tasks.title)
      setDescricao(json.tasks.description)
      setConcluida(json.tasks.completed)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(id !== undefined) {
      await api.editTask(id, titulo, descricao, concluido.toString())

      setTitulo('')
      setDescricao('')

      navigate('/tarefa/lista')
    }
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit}> 
        <div className="mb-3">
          <label className="form-label">Título da tarefa</label>
          <input type="text"
            className="form-control"
            value={titulo}
            onChange={handleForm.titulo}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descrição da tarefa</label>
          <input type="text"
            className="form-control"
            value={descricao}
            onChange={handleForm.descricao}
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            checked={concluido}
            onChange={handleForm.concluido} />
          <label className="form-check-label">Tarefa concluída</label>
        </div>
        <button type="submit" className="btn btn-sm btn btn-primary">Editar</button>
      </form>
      <Link to="/tarefa/lista"><button className="btn btn-sm btn btn-outline-primary">Voltar</button></Link>
    </div>
  )
}
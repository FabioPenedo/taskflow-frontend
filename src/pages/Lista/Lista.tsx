import { useEffect, useState } from "react";
import style from './Lista.module.css';
import { api } from '../../api'
import { Task } from "../../types/Tasks";
import { Link, useNavigate } from 'react-router-dom';


export const Lista = () => {

  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    let json = await api.getAllTask();
    setLoading(false);
    setTasks(json.tasks);
  }

  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    await api.deleteTask(id)

    navigate(0);
  }


  return (
    <div className={style.container}>
      <div className={style.topPart}>
        <h2>Gerenciador de Tarefas</h2>
        <div className={style.topPartButton}>
          <Link to="/tarefa/criar"><button className="btn btn-sm btn btn-outline-primary">Criar novo</button></Link>
        </div>
      </div>
      <div className={style.bottomPart}>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Título</th>
                <th scope="col">Descrição</th>
                <th scope="col" className="text-end">Ações</th>
              </tr>
            </thead>
            {!loading && tasks.length > 0 &&
              <tbody className="table-group-divider">
                {tasks.map((item, index) => (
                  <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td className="text-end">
                      <Link to={`/tarefa/editar/${item.id}`}>
                        <button className="btn btn-sm btn btn-outline-primary me-2">
                          Editar
                        </button>
                      </Link>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item.id)}>
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            }
          </table>
        </div>
      </div>

      {loading &&
        <div className="alert alert-dismissible alert-warning">Lista vazia, ou tente recarregar a página!</div>
      }
    </div>
  );
};
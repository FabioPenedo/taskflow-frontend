import { useEffect, useState } from "react";
import style from './Home.module.css';
import { api } from '../api'
import { Task } from "../types/Tasks";


export const Home = () => {

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

  if (tasks.length > 0) {
    console.log(tasks)
  }


  return (
    <div className={style.container}>
      <div className={style.topPart}>
        <h2>Gerenciador de Tarefas</h2>
        <div className={style.topPartButton}>
          <button className="btn btn-sm btn btn-outline-primary">Criar novo</button>
        </div>
      </div>

      {!loading && tasks.length > 0 &&
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
              <tbody className="table-group-divider">
                {tasks.map((item, index) => (
                  <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td className="text-end">
                      <button className="btn btn-sm btn btn-outline-primary me-2">
                        Editar
                      </button>
                      <button className="btn btn-sm btn-outline-danger">
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  );
};
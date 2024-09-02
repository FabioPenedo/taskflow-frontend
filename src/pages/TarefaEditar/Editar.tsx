import style from './Editar.module.css';
import { Link } from 'react-router-dom';

export const Editar = () => {
  return (
    <div className={style.container}>
      <form>
        <div className="mb-3">
          <label className="form-label">Título da tarefa</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label className="form-label">Descrição da tarefa</label>
          <input type="text" className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label">Tarefa concluída</label>
        </div>
        <button type="submit" className="btn btn-sm btn btn-primary">Editar</button>
      </form>
      <Link to="/"><button className="btn btn-sm btn btn-outline-primary">Voltar</button></Link>
    </div>
  )
}
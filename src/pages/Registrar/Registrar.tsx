import style from './Registrar.module.css';
import { Link } from 'react-router-dom';

export const Registrar = () => {
  return (
    <div className={style.container}>
      <form>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="Email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" className="btn btn-sm btn btn-primary">Criar</button>
      </form>
      <Link to="/"><button className="btn btn-sm btn btn-outline-primary">Logar</button></Link>
    </div>
  )
}
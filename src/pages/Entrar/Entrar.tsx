import style from './Entrar.module.css';
import { Link } from 'react-router-dom';

export const Entrar = () => {
  return (
    <div className={style.container}>
      <form>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="Email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" className="btn btn-sm btn btn-primary">Entrar</button>
      </form>
      <Link to="/registrar"><button className="btn btn-sm btn btn-outline-primary">Ir para Registrar</button></Link>
    </div>
  )
}
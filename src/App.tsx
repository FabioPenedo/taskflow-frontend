import { Route, Routes } from "react-router-dom";
import { Criar } from "./pages/TarefaCriar/Criar";
import { Editar } from "./pages/TarefaEditar/Editar";
import { RequireAuth } from './configs/RequireAuth';
import { Lista } from "./pages/Lista/Lista";
import { Entrar } from "./pages/Entrar/Entrar";
import { Registrar } from "./pages/Registrar/Registrar";
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Entrar />}></Route>
        <Route path='/registrar' element={<Registrar />}></Route>
        <Route path='/tarefa/lista' element={<RequireAuth><Lista /></RequireAuth>}></Route>
        <Route path='/tarefa/criar' element={<RequireAuth><Criar /></RequireAuth>}></Route>
        <Route path='/tarefa/editar' element={<RequireAuth><Editar /></RequireAuth>}></Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;

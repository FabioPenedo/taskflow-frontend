import { Navigate } from 'react-router-dom';

type Props = {
  children: JSX.Element
}

export const RequireAuth = ({ children }: Props) => {
  const isAuth = true;

  return isAuth ? children : <Navigate to='/' />;
}
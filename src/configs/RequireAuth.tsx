import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type Props = {
  children: JSX.Element
}

export const RequireAuth = ({ children }: Props) => {
  const { authToken } = useAuth();

  if (!authToken) {
    return <Navigate to="/" />;
  }

  return children;
}
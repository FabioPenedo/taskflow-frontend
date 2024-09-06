import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  authToken: string | null;
  login: (token: string) => void;
  logout: () => void;
  userId: string | null;
  handleUserId: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authToken, setAuthToken] = useState<string | null>(sessionStorage.getItem('authToken'));
  const [userId, setUserId] = useState<string | null>(sessionStorage.getItem('userId'));

  const login = (token: string) => {
    setAuthToken(token);
    sessionStorage.setItem('authToken', token);
  };

  const logout = () => {
    setAuthToken(null);
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');
  };

  const handleUserId = (id: string) =>  {
    setUserId(id)
    sessionStorage.setItem('userId', id);
  }

  return (
    <AuthContext.Provider value={{handleUserId, userId, authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

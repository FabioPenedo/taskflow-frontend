import { createContext, useContext, useState, ReactNode } from 'react';

interface TaskContextType {
  titulo: string;
  descricao: string;
  concluido: string;
  handleTask: {
    handleTitle: (title: string) => void
    handleDescription: (description: string) => void
    handleCompleted: (completed: string) => void
  }

}

const TaskContext = createContext<TaskContextType | null>(null);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [titulo, setTitulo] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [concluido, setConcluido] = useState<string>('');


  const handleTask = {
    handleTitle: (title: string) => {
      setTitulo(title)
    },
    handleDescription: (description: string) => {
      setDescricao(description)
    },
    handleCompleted: (completed: string) => {
      setConcluido(completed)
    }
  }



  return (
    <TaskContext.Provider value={{ titulo, descricao, concluido, handleTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useAuth = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um TaskProvider');
  }
  return context;
};

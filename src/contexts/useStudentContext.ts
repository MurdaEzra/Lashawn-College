import { useContext } from 'react';
import { StudentContext } from './StudentContextContext';

export function useStudentContext() {
  const context = useContext(StudentContext);

  if (context === undefined) {
    throw new Error('useStudentContext must be used within a StudentProvider');
  }

  return context;
}

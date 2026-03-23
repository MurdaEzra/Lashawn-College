import { createContext } from 'react';
import type { StudentContextType } from './StudentContext';

export const StudentContext = createContext<StudentContextType | undefined>(undefined);

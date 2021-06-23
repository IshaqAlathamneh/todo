import React from 'react';

import ToDo from './components/todo/todo-connected';
import AuthProvider from './context/authContext';
export default function App() {

  return (
    <>
    <AuthProvider>
      <ToDo />
    </AuthProvider>
    </>
  );

}

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ user, redirectTo = '/login', children }) => {
  if (!user) {
    // Si no hay un objeto 'user', redirige a la página de login
    return <Navigate to={redirectTo} replace />;
  }

  // Si hay un objeto 'user', muestra el contenido de la ruta anidada (usando <Outlet />)
  return children ? children : <Outlet />;
};
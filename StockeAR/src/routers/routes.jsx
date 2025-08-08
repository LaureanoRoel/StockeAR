import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../hooks/ProtectedRoute"; 
import {
  Configuracion,
  Home,
  Login,
  Marca,
  UserAuth,
  Categorias,
  Productos,
} from "../index";

export function MyRoutes() {
  const { user } = UserAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>
        <Route path="/" element={<Home />} />
        <Route path="/configurar" element={<Configuracion />} />
        <Route path="/configurar/marca" element={<Marca />} />
        <Route path="/configurar/categorias" element={<Categorias />} />
        <Route path="/productos" element={<Productos />} />
      </Route>
    </Routes>
  );
}
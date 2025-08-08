// routers/routes.jsx (CORREGIDO)
import { Routes, Route } from "react-router-dom";
import {
  Configuracion,
  Home,
  Login,
  Marca,
  ProtectedRoute,
  UserAuth,
  Categorias,
  Productos,
} from "../index";

export function MyRoutes() {
  // Solo necesitamos obtener el estado del usuario para pasarlo a ProtectedRoute
  const { user } = UserAuth();

  return (
    <Routes>
      {/* Esta ruta es pública */}
      <Route path="/login" element={<Login />} />

      {/* Todo lo que esté dentro de este Route estará protegido */}
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
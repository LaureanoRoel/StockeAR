import styled from "styled-components";
import { v } from "../../styles/variables";
import { CardDatosEmpresa } from "../moleculas/CardDatosEmpresa";
// --- CAMBIO: Importamos el store de autenticación ---
import { useAuthStore } from "../../store/AuthStore";

export function BannerEmpresa() {
  // --- CAMBIO: Obtenemos el usuario (que contiene la empresa) desde useAuthStore ---
  const { user } = useAuthStore();

  // --- SOLUCIÓN: Si el usuario aún no se ha cargado, no mostramos nada ---
  if (!user) {
    return null; // O puedes poner un componente de carga si prefieres
  }

  // Si el código llega aquí, 'user' y 'user.empresa' ya existen y son seguros de usar.
  return (
    <Container>
      <div className="content-wrapper-context">
        <span className="titulo">
          {<v.iconoempresa />}
          {user.empresa?.nombre}
        </span>
        <div className="content-text">
          StockPRO te mantiene siempre informado.
        </div>
        <ContentCards>
          <CardDatosEmpresa titulo="Moneda" valor={user.empresa?.simbolo_moneda} />
          
          {/* La lógica para contar usuarios ahora está en la página Home, 
              así que por ahora dejamos este dato estático o lo quitamos 
              para evitar errores. */}
          <CardDatosEmpresa titulo="Usuarios" valor={"-"} />
          
        </ContentCards>
      </div>
      
      {/* El resto de tu código SVG no necesita cambios */}
      <div className="contentsvg">{/* ... */}</div>
      <svg className="cuadros">{/* ... */}</svg>
    </Container>
  );
}

// El resto de tus styled-components no necesita cambios
const Container = styled.div`
  /* ... */
`;
const ContentCards = styled.div`
  /* ... */
`;
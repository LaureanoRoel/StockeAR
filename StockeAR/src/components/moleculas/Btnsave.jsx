import styled from "styled-components";
import { Icono } from "../../index";

export function Btnsave({ funcion, titulo, bgcolor, icono, url }) {
  // Si se le pasa una función, se comporta como un botón normal.
  // Si no, se comporta como un botón de submit por defecto.
  const type = funcion ? "button" : "submit";

  return (
    <Container
      onClick={funcion}
      type={type}
      $bgcolor={bgcolor}
    >
      {icono && <Icono>{icono}</Icono>}
      
      {/* El <a> ahora solo se renderiza si hay una URL */}
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {titulo}
        </a>
      ) : (
        titulo
      )}
    </Container>
  );
}

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  border: 3px solid black;
  border-radius: 0.4em;
  padding: 0.6em 1.3em;
  font-weight: 900;
  font-size: 18px;
  cursor: pointer;
  background: ${(props) => props.$bgcolor};
  box-shadow: 0.1em 0.1em #000;
  transition: 0.2s;
  
  &:hover {
    transform: translate(-0.05em, -0.05em);
    box-shadow: 0.15em 0.15em #000;
  }
  &:active {
    transform: translate(0.05em, 0.05em);
    box-shadow: 0.05em 0.05em #000;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
`;
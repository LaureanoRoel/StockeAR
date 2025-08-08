import styled from "styled-components";
import { Icono } from "../../index";

export function Btnsave({ funcion, titulo, bgcolor, icono, url }) {
  // --- CAMBIO: El botón ahora maneja el 'onClick' y su 'type' es dinámico ---
  return (
    <Container 
      onClick={funcion} 
      type={funcion ? "button" : "submit"} // Si tiene una función, es un botón normal. Si no, es un 'submit'.
      $bgcolor={bgcolor}
    >
      <Icono>{icono}</Icono>
      
      {/* --- CAMBIO: El span ya no necesita un onClick --- */}
      <span className="btn">
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            {titulo}
          </a>
        ) : (
          titulo
        )}
      </span>
    </Container>
  );
}
const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  border: none;
  gap: 10px;
  background-color:initial;
 z-index:2;
  .btn{
    background: ${(props)=>props.$bgcolor};
    padding: 0.6em 1.3em;
    font-weight: 900;
    font-size: 18px;
    border: 3px solid black;
    border-radius: 0.4em;
    box-shadow: 0.1em 0.1em #000;
    transition: 0.2s;
    white-space: 1px;
    color: #000;
    a{
      text-decoration:none;
      color: #000;
    }
    cursor: pointer;
    &:hover{
      transform: translate(-0.05em, -0.05em);
      box-shadow: 0.15em 0.15em #000;
    }
    &:active{
      transform: translate(0.05em, 0.05em);
      box-shadow: 0.05em 0.05em #000;
    }
  }
  
`;
import React, { useState } from "react";
import styled from "styled-components";
import { RegistrarCategorias, useCategoriasStore } from "../../index";
import { FaEdit, FaTrash } from "react-icons/fa";

export function CategoriasTemplate({ data }) {
  const [showForm, setShowForm] = useState(false);
  const [accion, setAccion] = useState("");
  const [dataSelect, setDataSelect] = useState({});
  const { eliminarcategorias } = useCategoriasStore();

  const handleEdit = (item) => {
    setDataSelect(item);
    setAccion("Editar");
    setShowForm(true);
  };

  const handleNew = () => {
    setDataSelect({});
    setAccion("Nuevo");
    setShowForm(true);
  };
  
  const handleDelete = (id) => {
    if(window.confirm("¿Estás seguro de que quieres eliminar esta categoría?")) {
      eliminarcategorias({ id });
    }
  };

  return (
    <Container>
      <Header>
        <h1>Categorías</h1>
        <button onClick={handleNew}>+ Nueva Categoría</button>
      </Header>

      {showForm && (
        <Modal>
          <RegistrarCategorias
            onClose={() => setShowForm(false)}
            accion={accion}
            dataSelect={dataSelect}
          />
        </Modal>
      )}

      <Table>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Color</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td>{item.descripcion}</td>
              <td>
                <ColorCircle color={item.color} />
              </td>
              <td className="actions">
                <button onClick={() => handleEdit(item)}><FaEdit /></button>
                <button onClick={() => handleDelete(item.id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

// Estilos
const Container = styled.div`
  padding: 20px;
  color: ${({ theme }) => theme.text};
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    &:hover {
      opacity: 0.9;
    }
  }
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td {
    padding: 12px 15px;
    border-bottom: 1px solid ${({ theme }) => theme.bg3};
    text-align: left;
  }
  th {
    font-weight: bold;
    text-transform: uppercase;
    font-size: 12px;
    color: ${({ theme }) => theme.text_secondary};
  }
  .actions {
    button {
      background: none;
      border: none;
      cursor: pointer;
      color: ${({ theme }) => theme.text};
      margin-right: 10px;
      font-size: 16px;
      &:hover {
        color: #4caf50;
      }
    }
  }
`;
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;
const ColorCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 1px solid ${({ theme }) => theme.bg_secondary};
`;

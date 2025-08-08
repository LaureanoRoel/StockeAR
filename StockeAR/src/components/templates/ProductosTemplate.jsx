import { useState } from "react";
import styled from "styled-components";
import {
  Header,
  FormularioProducto,
  Buscador,
  useProductosStore,
} from "../../index";
import { FaEdit, FaTrash } from "react-icons/fa";

export function ProductosTemplate({ data }) {
  const [showForm, setShowForm] = useState(false);
  const [dataSelect, setDataSelect] = useState({});
  const [accion, setAccion] = useState("");
  const { setBuscador, eliminarproductos } = useProductosStore();
  const [state, setState] = useState(false);

  const handleNew = () => {
    setDataSelect({});
    setAccion("Nuevo");
    setShowForm(true);
  };
  
  const handleEdit = (item) => {
    setDataSelect(item);
    setAccion("Editar");
    setShowForm(true);
  };
  
  const handleDelete = (id) => {
    if(window.confirm("¿Estás seguro?")) {
      eliminarproductos({ id });
    }
  };

  return (
    <Container>
      {showForm && (
        <FormularioProducto
          onClose={() => setShowForm(false)} 
          dataSelect={dataSelect} 
          accion={accion} 
        />
      )}
      
      <div className="header">
        <Header stateConfig={{ state: state, setState: () => setState(!state) }} />
      </div>
      
      <TitleActions>
        <h1>Productos</h1>
        <button onClick={handleNew}>+ Nuevo Producto</button>
      </TitleActions>

      <BuscadorContainer>
        <Buscador setBuscador={setBuscador} />
      </BuscadorContainer>

      <Table>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Marca</th>
            <th>Stock</th>
            <th>P. Venta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td>{item.descripcion}</td>
              <td><CategoryLabel>{item.categoria.descripcion}</CategoryLabel></td>
              <td>{item.marca.descripcion}</td>
              <td>{item.stock}</td>
              <td>{item.precio_venta}</td>
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
  padding: 15px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  color: ${({ theme }) => theme.text};
`;
const TitleActions = styled.div`
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
  }
`;
const BuscadorContainer = styled.div`
  margin-bottom: 20px;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td { padding: 12px; border-bottom: 1px solid ${({ theme }) => theme.bg3}; text-align: left; }
  th { font-weight: bold; }
  .actions button { background: none; border: none; cursor: pointer; color: ${({ theme }) => theme.text}; margin-right: 10px; font-size: 16px; }
`;
const Modal = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex; justify-content: center; align-items: center; z-index: 100;
`;
const CategoryLabel = styled.span`
  background-color: ${(props) => props.theme.bg5};
  color: ${(props) => props.theme.text};
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
`;
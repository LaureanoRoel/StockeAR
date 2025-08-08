import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  InputText,
  Btnsave,
  useAuthStore,
  ConvertirCapitalize,
  useProductosStore,
  useCategoriasStore,
  useMarcaStore,
  RegistrarMarca,
  RegistrarCategorias
} from "../../../index";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

export function FormularioProducto({ onClose, dataSelect, accion }) {
  const { user } = useAuthStore();
  const { insertarproductos, editarproductos } = useProductosStore();
  const { mostrarcategorias, datacategorias } = useCategoriasStore();
  const { mostrarmarcas, datamarcas } = useMarcaStore();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const [showMarcaForm, setShowMarcaForm] = useState(false);
  const [showCategoriaForm, setShowCategoriaForm] = useState(false);

  // Traer categorías y marcas para los selectores
  useQuery({
    queryKey: ["categorias para productos", user.empresa.id],
    queryFn: () => mostrarcategorias({ id_empresa: user.empresa.id }),
  });
  useQuery({
    queryKey: ["marcas para productos", user.empresa.id],
    queryFn: () => mostrarmarcas({ id_empresa: user.empresa.id }),
  });
  
  // Llenar formulario si es para editar
  useEffect(() => {
    if (accion === "Editar") {
      setValue("descripcion", dataSelect.descripcion);
      setValue("stock", dataSelect.stock);
      setValue("stock_minimo", dataSelect.stock_minimo);
      setValue("precio_venta", dataSelect.precio_venta);
      setValue("precio_compra", dataSelect.precio_compra);
      setValue("categoria_id", dataSelect.categoria_id);
      setValue("marca_id", dataSelect.marca_id);
    }
  }, []);

  // Función que se ejecuta al guardar el formulario
  async function onSubmit(data) {
    const p = {
      descripcion: ConvertirCapitalize(data.descripcion),
      stock: parseFloat(data.stock),
      stock_minimo: parseFloat(data.stock_minimo),
      precio_venta: parseFloat(data.precio_venta),
      precio_compra: parseFloat(data.precio_compra),
      categoria_id: data.categoria_id,
      marca_id: data.marca_id,
      empresa_id: user.empresa.id,
    };
    if (accion === "Editar") {
      await editarproductos({ ...p, id: dataSelect.id });
    } else {
      await insertarproductos(p);
    }
    onClose();
  }

  return (
    <Container>
      {/* Modales para "quick add" */}
      {showMarcaForm && <RegistrarMarca accion="Nuevo" onClose={() => setShowMarcaForm(false)} dataSelect={{}} />}
      {showCategoriaForm && <RegistrarCategorias accion="Nuevo" onClose={() => setShowCategoriaForm(false)} dataSelect={{}} />}

      <div className="sub-contenedor">
        <Header>
          <h1>{accion === "Editar" ? "Editar Producto" : "Registrar Nuevo Producto"}</h1>
          <span onClick={onClose}>x</span>
        </Header>
        <Form className="formulario" onSubmit={handleSubmit(onSubmit)}>
          <InputText label="Descripción" name="descripcion" register={register} required />
          <InputText label="Stock" name="stock" type="number" register={register} required />
          <InputText label="Stock Mínimo" name="stock_minimo" type="number" register={register} />
          <InputText label="Precio Venta" name="precio_venta" type="number" step="0.01" register={register} required />
          <InputText label="Precio Compra" name="precio_compra" type="number" step="0.01" register={register} required />
          <SelectorContainer>
            <label>Categoría:</label>
            <div className="content">
              <select {...register("categoria_id", { valueAsNumber: true })}>
                {datacategorias?.map((item) => <option key={item.id} value={item.id}>{item.descripcion}</option>)}
              </select>
              <AddButton type="button" onClick={() => setShowCategoriaForm(true)}>+</AddButton>
            </div>
          </SelectorContainer>
          <SelectorContainer>
            <label>Marca:</label>
            <div className="content">
              <select {...register("marca_id", { valueAsNumber: true })}>
                {datamarcas?.map((item) => <option key={item.id} value={item.id}>{item.descripcion}</option>)}
              </select>
              <AddButton type="button" onClick={() => setShowMarcaForm(true)}>+</AddButton>
            </div>
          </SelectorContainer>
          <div className="btnguardarContent">
            <Btnsave titulo={accion === "Editar" ? "Actualizar" : "Guardar"} />
          </div>
        </Form>
      </div>
    </Container>
  );
}

// Estilos
const Container = styled.div`
  transition: 0.5s; top: 0; left: 0; position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex; width: 100%; min-height: 100vh;
  align-items: center; justify-content: center; z-index: 1000;

  .sub-contenedor {
    width: 600px; max-width: 85%; // <-- Corregido
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;
    color: ${({ theme }) => theme.text};
  }
`;
const Header = styled.div`
  display: flex; justify-content: space-between;
  align-items: center; margin-bottom: 20px;
  h1 { font-size: 20px; font-weight: 500; }
  span { font-size: 20px; cursor: pointer; }
`;
const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  .btnguardarContent {
    grid-column: 1 / -1;
    display: flex;
    justify-content: flex-end;
  }
`;
const SelectorContainer = styled.div`
  display: flex; flex-direction: column; gap: 5px;
  .content {
    display: flex; align-items: center; gap: 10px;
    select { flex: 1; padding: 10px; border-radius: 8px; }
  }
`;
const AddButton = styled.button`
  padding: 8px 12px; background-color: #4caf50;
  color: white; border: none; border-radius: 50%;
  cursor: pointer; font-size: 16px; font-weight: bold;
`;
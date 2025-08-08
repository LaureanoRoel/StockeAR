import { useEffect, useState } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import {
  InputText,
  Btnsave,
  useProductosStore,
  useMarcaStore,
  useCategoriasStore,
  useAuthStore,
  RegistrarMarca,
  RegistrarCategorias,
} from "../../../index";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

export function FormularioProducto({ onClose, dataSelect = {}, accion }) {
  const { user } = useAuthStore();
  const { insertarproductos, editarproductos } = useProductosStore();
  const { mostrarcategorias, datacategorias } = useCategoriasStore();
  const { mostrarmarcas, datamarcas } = useMarcaStore();

  const [showMarcaForm, setShowMarcaForm] = useState(false);
  const [showCategoriaForm, setShowCategoriaForm] = useState(false);

  useQuery({
    queryKey: ["categorias para productos", user.empresa.id],
    queryFn: () => mostrarcategorias({ id_empresa: user.empresa.id }),
  });
  useQuery({
    queryKey: ["marcas para productos", user.empresa.id],
    queryFn: () => mostrarmarcas({ id_empresa: user.empresa.id }),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      descripcion: dataSelect.descripcion ?? "",
      stock: dataSelect.stock ?? "",
      stock_minimo: dataSelect.stock_minimo ?? "",
      precio_venta: dataSelect.precio_venta ?? "",
      precio_compra: dataSelect.precio_compra ?? "",
      categoria_id: dataSelect.categoria_id ?? "",
      marca_id: dataSelect.marca_id ?? "",
    }
  });

  async function onSubmit(data) {
    console.log("Datos enviados:", data);
    const p = {
      ...data,
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
      {showMarcaForm && (
        <RegistrarMarca
          accion="Nuevo"
          onClose={() => setShowMarcaForm(false)}
          dataSelect={{}}
        />
      )}
      {showCategoriaForm && (
        <RegistrarCategorias
          accion="Nuevo"
          onClose={() => setShowCategoriaForm(false)}
          dataSelect={{}}
        />
      )}

      <div className="sub-contenedor">
        <div className="headers">
          <h1>{accion === "Editar" ? "Editar Producto" : "Registrar Producto"}</h1>
          <span onClick={onClose}>x</span>
        </div>

        <FormStyled onSubmit={handleSubmit(onSubmit)}>
          <section>
            <article>
              <InputText icono={<v.iconoprod />}>
                <input
                  className="form__field"
                  placeholder="Descripción"
                  {...register("descripcion", { required: "La descripción es obligatoria" })}
                />
                <label className="form__label">Descripción</label>
              </InputText>
              {errors.descripcion && <ErrorMsg>{errors.descripcion.message}</ErrorMsg>}
            </article>

            <article>
              <InputText icono={<v.iconostock />}>
                <input
                  className="form__field"
                  placeholder="Stock"
                  type="number"
                  {...register("stock", {
                    required: "El stock es obligatorio",
                    validate: value => value !== "" || "El stock es obligatorio"
                  })}
                />
                <label className="form__label">Stock</label>
              </InputText>
              {errors.stock && <ErrorMsg>{errors.stock.message}</ErrorMsg>}
            </article>

            <article>
              <InputText icono={<v.iconostockminimo />}>
                <input
                  className="form__field"
                  placeholder="Stock Mínimo"
                  type="number"
                  {...register("stock_minimo")}
                />
                <label className="form__label">Stock Mínimo</label>
              </InputText>
            </article>

            <article>
              <InputText icono={<v.iconoprecioventa />}>
                <input
                  className="form__field"
                  placeholder="Precio Venta"
                  type="number"
                  step="0.01"
                  {...register("precio_venta", {
                    required: "El precio de venta es obligatorio",
                    validate: value => value !== "" || "El precio de venta es obligatorio"
                  })}
                />
                <label className="form__label">Precio Venta</label>
              </InputText>
              {errors.precio_venta && <ErrorMsg>{errors.precio_venta.message}</ErrorMsg>}
            </article>

            <article>
              <InputText icono={<v.iconopreciocompra />}>
                <input
                  className="form__field"
                  placeholder="Precio Compra"
                  type="number"
                  step="0.01"
                  {...register("precio_compra", {
                    required: "El precio de compra es obligatorio",
                    validate: value => value !== "" || "El precio de compra es obligatorio"
                  })}
                />
                <label className="form__label">Precio Compra</label>
              </InputText>
              {errors.precio_compra && <ErrorMsg>{errors.precio_compra.message}</ErrorMsg>}
            </article>

            <SelectorContainer>
              <label>Categoría:</label>
              <div className="content">
                <select {...register("categoria_id")}>
                  <option value="">Seleccione</option>
                  {datacategorias?.map((item) => (
                    <option key={item.id} value={item.id}>{item.descripcion}</option>
                  ))}
                </select>
                <AddButton type="button" onClick={() => setShowCategoriaForm(true)}>+</AddButton>
              </div>
            </SelectorContainer>

            <SelectorContainer>
              <label>Marca:</label>
              <div className="content">
                <select {...register("marca_id")}>
                  <option value="">Seleccione</option>
                  {datamarcas?.map((item) => (
                    <option key={item.id} value={item.id}>{item.descripcion}</option>
                  ))}
                </select>
                <AddButton type="button" onClick={() => setShowMarcaForm(true)}>+</AddButton>
              </div>
            </SelectorContainer>
          </section>

          <div className="btnguardarContent">
            <Btnsave titulo={accion === "Editar" ? "Actualizar" : "Guardar"} />
          </div>
        </FormStyled>
      </div>
    </Container>
  );
}

// estilos
const Container = styled.div`
  position: fixed; top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex; justify-content: center; align-items: center; z-index: 100;
  .sub-contenedor {
    width: 800px; max-width: 90%;
    padding: 20px;
    background-color: ${({ theme }) => theme.bgtotal};
    border-radius: 12px;
    color: ${({ theme }) => theme.text};
    .headers {
      display: flex; justify-content: space-between;
      align-items: center; margin-bottom: 20px;
    }
  }
`;

const FormStyled = styled.form`
  section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .btnguardarContent {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
`;

const SelectorContainer = styled.div`
  display: flex; flex-direction: column; gap: 5px;
  .content {
    display: flex; align-items: center; gap: 10px;
    select {
      flex: 1; padding: 10px; border-radius: 8px;
    }
  }
`;

const AddButton = styled.button`
  padding: 8px 12px; background-color: #4caf50;
  color: white; border: none; border-radius: 50%;
  cursor: pointer; font-size: 16px; font-weight: bold;
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-top: -10px;
  margin-bottom: 10px;
`;

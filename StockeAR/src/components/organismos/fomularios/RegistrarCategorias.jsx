import { useEffect, useState } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import {
  InputText,
  Btnsave,
  useAuthStore, // Usaremos este para obtener el id de la empresa
  ConvertirCapitalize,
  useCategoriasStore,
} from "../../../index";
import { useForm } from "react-hook-form";
import { CirclePicker } from "react-color";

export function RegistrarCategorias({ onClose, dataSelect, accion }) {
  const [currentColor, setColor] = useState("#36e1f4ff");
  const { insertarcategorias, editarcategorias } = useCategoriasStore();
  
  // --- CAMBIO: Obtenemos el usuario logueado desde el AuthStore ---
  const { user } = useAuthStore();
  
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue, // <-- AÑADIDO: para poder setear valores en el form
  } = useForm();

  const elegirColor = (color) => {
    setColor(color.hex);
  };

  async function insertar(data) {
    // --- CAMBIO: El objeto 'p' ahora tiene los nombres de campo correctos para la API ---
    const p = {
      descripcion: ConvertirCapitalize(data.nombre),
      color: currentColor,
      empresa_id: user.empresa.id, // Obtenemos el id de la empresa del usuario logueado
    };

    if (accion === "Editar") {
      // Si es una edición, añadimos el id de la categoría
      await editarcategorias({ ...p, id: dataSelect.id });
    } else {
      await insertarcategorias(p);
    }
    onClose();
  }

  useEffect(() => {
    if (accion === "Editar") {
      // --- CAMBIO: Usamos setValue de react-hook-form para llenar el input ---
      setValue("nombre", dataSelect.descripcion);
      setColor(dataSelect.color);
    }
  }, []);

  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>
              {accion === "Editar"
                ? "Editar Categoría"
                : "Registrar Nueva Categoría"}
            </h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>

        <form className="formulario" onSubmit={handleSubmit(insertar)}>
          <section>
            <article>
              {/* --- CAMBIO: Eliminamos defaultValue para que react-hook-form controle el valor --- */}
              <InputText icono={<v.iconomarca />}>
                <input
                  className="form__field"
                  type="text"
                  placeholder="Descripción de la categoría"
                  {...register("nombre", {
                    required: true,
                  })}
                />
                <label className="form__label">Categoría</label>
                {errors.nombre?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <article className="colorContainer">
              <CirclePicker onChange={elegirColor} color={currentColor} />
            </article>

            <div className="btnguardarContent">
              <Btnsave
                icono={<v.iconoguardar />}
                titulo="Guardar"
                bgcolor="#efef2bff"
              />
            </div>
          </section>
        </form>
      </div>
    </Container>
  );
}
const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .sub-contenedor {
    width: 500px;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .formulario {
      section {
        gap: 20px;
        display: flex;
        flex-direction: column;
        .colorContainer {
          .colorPickerContent {
            padding-top: 15px;
            min-height: 50px;
          }
        }
      }
    }
  }
`;

const ContentTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  svg {
    font-size: 25px;
  }
  input {
    border: none;
    outline: none;
    background: transparent;
    padding: 2px;
    width: 40px;
    font-size: 28px;
  }
`;
const ContainerEmojiPicker = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

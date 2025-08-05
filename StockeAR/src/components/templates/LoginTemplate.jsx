// components/templates/LoginTemplate.jsx
import styled from "styled-components";
import { Btnsave, v, useAuthStore, InputText, FooterLogin, RegistrarAdmin } from "../../index";
import { Device } from "../../styles/breackpoints";
import { useContext, useState, useEffect } from "react"; // <-- CAMBIO: Importamos useEffect
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import carrito from "../../assets/carrito.svg";
import logo from "../../assets/inventarioslogo.png";
import { MdOutlineInfo } from "react-icons/md";
import { ThemeContext } from "../../App";

export function LoginTemplate() {
  const { setTheme } = useContext(ThemeContext);
  setTheme("light");

  // <-- CAMBIO: Obtenemos el usuario y el error del store
  const { signInWithEmail, user, error: authError } = useAuthStore();
  const [state, setState] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // <-- CAMBIO: La función ahora solo envía los datos
  async function iniciar(data) {
    await signInWithEmail({
      correo: data.correo,
      pass: data.pass,
    });
  }

  // <-- CAMBIO: Usamos useEffect para reaccionar al cambio de estado del usuario
  useEffect(() => {
    if (user) {
      navigate("/"); // Si el usuario existe, navegamos a la página principal
    }
  }, [user, navigate]); // Se ejecuta cada vez que 'user' o 'navigate' cambian

  return (
    <Container>
      {/* ... (el resto de tu JSX de logos y banners no cambia) ... */}
      <div className="contentLogo">
        <img src={logo}></img>
        <span>StockeAR</span>
      </div>
      <div className="bannerlateral">
        <img src={carrito}></img>
      </div>

      <div className="contentCard">
        <div className="card">
          {state && <RegistrarAdmin setState={() => setState(!state)} />}
          <Titulo>StockPRO</Titulo>
          
          {/* <-- CAMBIO: Mostramos el error que viene del store */}
          {authError && (
            <TextoStateInicio>{authError}</TextoStateInicio>
          )}

          <span className="ayuda">
            Puedes crear una cuenta nueva ó <br></br>solicitar a tu empleador
            una. <MdOutlineInfo />
          </span>
          <p className="frase">Controla tu inventario.</p>
          <form onSubmit={handleSubmit(iniciar)}>
            <InputText icono={<v.iconoemail />}>
              <input
                className="form__field"
                type="text"
                placeholder="email"
                {...register("correo", { required: true })}
              />
              <label className="form__label">email</label>
              {errors.correo?.type === "required" && <p>Campo requerido</p>}
            </InputText>
            <InputText icono={<v.iconopass />}>
              <input
                className="form__field"
                type="password"
                placeholder="contraseña"
                {...register("pass", { required: true })}
              />
              <label className="form__label">pass</label>
              {errors.pass?.type === "required" && <p>Campo requerido</p>}
            </InputText>
            <ContainerBtn>
              <Btnsave titulo="Iniciar" bgcolor="#fc6b32" />
              <Btnsave
                funcion={() => setState(!state)}
                titulo="Crear cuenta"
                bgcolor="#ffffff"
              />
            </ContainerBtn>
          </form>
        </div>
        <FooterLogin />
      </div>
    </Container>
  );
}
// ... (tus styled-components no cambian)
const Container = styled.div`
  /* ... */
`;
const Titulo = styled.span`
  /* ... */
`;
const ContainerBtn = styled.div`
  /* ... */
`;
const TextoStateInicio = styled.p`
  color: #fc7575;
`;
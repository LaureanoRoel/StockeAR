# StockeAR - Sistema de Gestión de Inventarios

Este proyecto es un sistema de gestión de inventarios desarrollado con backend en FastAPI y un frontend en React.

## Descripción del Proyecto

La aplicación permite a distintas empresas gestionar su propio inventario. Cada empresa cuenta con sus propios usuarios, categorías, marcas y productos, asegurando que la información de cada una se mantenga privada y organizada. El sistema soporta operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para las entidades principales 

---

## Arquitectura del Backend (FastAPI)

El backend fue la pieza central del desarrollo, construido con FastAPI por su alto rendimiento y sus capacidades asíncronas.

### Tecnologías Utilizadas
* **Framework:** FastAPI
* **Base de Datos:** SQLite (manejada de forma asíncrona con `aiosqlite`)
* **ORM:** SQLAlchemy (en su versión asíncrona para interactuar con la base de datos)
* **Migraciones:** Alembic (para gestionar los cambios en el esquema de la base de datos de forma versionada)
* **Autenticación:** Tokens JWT (con `python-jose` para la creación/validación y `passlib` para el hasheo de contraseñas)
* **Validación de Datos:** Pydantic (integrado nativamente en FastAPI para validar los modelos de entrada y salida)

### Estructura del Backend

El proyecto sigue una estructura de capas para separar responsabilidades, haciendo el código más mantenible y escalable:

* **`models.py`:** Define la estructura de las tablas de la base de datos usando los modelos de SQLAlchemy. Aquí se establecen las relaciones (ej: un `Producto` pertenece a una `Categoria` y a una `Empresa`).
* **`schemas.py`:** Define la "forma" de los datos que la API espera recibir y enviar, usando modelos de Pydantic. Esto asegura una validación robusta de los datos.
* **`dal.py` (Data Access Layer):** Contiene todas las funciones que interactúan directamente con la base de datos. Abstrae la lógica de las consultas (SELECT, INSERT, UPDATE, DELETE) para que los endpoints sean más limpios.
* **`routers/`:** Carpeta que contiene los diferentes endpoints de la API, agrupados por recurso (`productos.py`, `usuarios.py`, etc.). Se encargan de recibir las peticiones HTTP y llamar a la capa DAL.
* **`security.py`:** Módulo dedicado a la lógica de autenticación: creación y verificación de tokens, y manejo de contraseñas.

### Autenticación
El sistema utiliza `OAuth2PasswordBearer` con tokens JWT. El flujo es el siguiente:
1.  Un usuario envía su email y contraseña al endpoint `/auth/token`.
2.  El servidor verifica las credenciales contra la base de datos.
3.  Si son correctas, genera un token JWT que contiene el email del usuario y una fecha de expiración.
4.  El frontend guarda este token.
5.  Para acceder a rutas protegidas, el frontend envía el token en el encabezado `Authorization`. El backend lo verifica en cada petición para asegurar que el usuario tenga acceso.

### Documentación de la API
La API genera automáticamente su propia documentación interactiva (gracias a OpenAPI y Swagger UI), la cual está disponible en la ruta `/docs` del servidor backend. Desde allí se pueden probar todos los endpoints.

---

## Frontend (React)

El frontend es una Single-Page Application (SPA) construida con:
* **Librería:** React
* **Build Tool:** Vite
* **Manejo de Estado:** Zustand
* **Fetching y Caché de Datos:** TanStack Query (React Query)
* **Estilos:** Styled-components
* **Routing:** React Router

---

## Cómo Ejecutar el Proyecto

Se necesitan dos terminales para correr el proyecto.

### 1. Levantar el Backend
```bash
# Navegar a la carpeta del backend
cd fast_api_backend

# Activar el entorno virtual
# Windows
env\Scripts\activate
# macOS/Linux
# source env/bin/activate

# Instalar dependencias (solo la primera vez)
pip install -r requirements.txt

# Aplicar migraciones de la base de datos
alembic upgrade head


### 1. Levantar el Backend
# Iniciar el servidor
python -m uvicorn app.main:app --reload

# Navegar a la carpeta del frontend
cd StockeAR

# Instalar dependencias (solo la primera vez)
npm install

# Iniciar el servidor de desarrollo
npm run dev

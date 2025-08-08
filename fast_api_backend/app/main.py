# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
# Importamos TODOS los routers, incluido el nuevo de productos
from .routers import usuarios, categorias, marcas, empresas, auth, productos

app = FastAPI(title="Gestor API")

# Lista de orígenes permitidos (la dirección de tu frontend de React)
origins = [
    "http://localhost:5173",
]

# Añadimos el middleware de CORS para permitir la comunicación entre frontend y backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Incluimos todos los routers en la aplicación principal
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(usuarios.router, prefix="/usuarios", tags=["Usuarios"])
app.include_router(categorias.router, prefix="/categorias", tags=["Categorías"])
app.include_router(marcas.router, prefix="/marcas", tags=["Marcas"])
app.include_router(empresas.router, prefix="/empresas", tags=["Empresas"])
app.include_router(productos.router, prefix="/productos", tags=["Productos"])

# Ruta de bienvenida
@app.get("/")
async def root():
    return {"message": "Bienvenido a la API del Gestor"}
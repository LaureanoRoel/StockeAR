# app/main.py
from fastapi import FastAPI
# --- AÑADIDO: Importamos el middleware de CORS ---
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import usuarios, categorias, marcas, empresas, auth 

app = FastAPI(title="Gestor API")

# --- AÑADIDO: Configuración de CORS ---
# Lista de orígenes permitidos (la dirección de tu frontend de React)
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Permite todos los métodos (GET, POST, etc.)
    allow_headers=["*"], # Permite todos los encabezados
)


@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        # Esto crea las tablas si no existen al iniciar.
        await conn.run_sync(Base.metadata.create_all)


# Incluimos todos los routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(usuarios.router, prefix="/usuarios", tags=["Usuarios"])
app.include_router(categorias.router, prefix="/categorias", tags=["Categorías"])
app.include_router(marcas.router, prefix="/marcas", tags=["Marcas"])
app.include_router(empresas.router, prefix="/empresas", tags=["Empresas"])


@app.get("/")
async def root():
    return {"message": "Bienvenido a la API del Gestor"}
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import usuarios, categorias, marcas, empresas, auth, productos

app = FastAPI(title="Gestor API")


origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(usuarios.router, prefix="/usuarios", tags=["Usuarios"])
app.include_router(categorias.router, prefix="/categorias", tags=["Categorías"])
app.include_router(marcas.router, prefix="/marcas", tags=["Marcas"])
app.include_router(empresas.router, prefix="/empresas", tags=["Empresas"])
app.include_router(productos.router, prefix="/productos", tags=["Productos"])

@app.get("/")
async def root():
    return {"message": "Bienvenido a StockeAR"}
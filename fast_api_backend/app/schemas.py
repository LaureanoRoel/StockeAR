# app/schemas.py
from pydantic import BaseModel
from typing import Optional, List

# --- Schemas para Empresa, Categoria y Marca ---

class EmpresaBase(BaseModel):
    nombre: str
    simbolo_moneda: str

class EmpresaCreate(EmpresaBase):
    pass

class Empresa(EmpresaBase):
    id: int
    class Config:
        from_attributes = True

class CategoriaBase(BaseModel):
    descripcion: str

class CategoriaCreate(CategoriaBase):
    empresa_id: int

class Categoria(CategoriaBase):
    id: int
    empresa_id: int
    class Config:
        from_attributes = True

class MarcaBase(BaseModel):
    descripcion: str

# --- CAMBIO: Corregido de "Marcare" a "MarcaBase" ---
class MarcaCreate(MarcaBase):
    empresa_id: int

class Marca(MarcaBase):
    id: int
    empresa_id: int
    class Config:
        from_attributes = True

# --- Schemas para Usuario (adaptados para login con contraseña) ---

class UsuarioBase(BaseModel):
    email: str

class UsuarioCreate(UsuarioBase):
    password: str
    empresa_id: int

class Usuario(UsuarioBase):
    id: int
    empresa_id: int
    empresa: Empresa

    class Config:
        from_attributes = True

# --- Schema para la respuesta del Token ---


class Token(BaseModel):
    access_token: str
    token_type: str
    user: Usuario
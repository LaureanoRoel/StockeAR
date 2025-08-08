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
    color: Optional[str] = None

class CategoriaCreate(CategoriaBase):
    empresa_id: int

class Categoria(CategoriaBase):
    id: int
    # empresa_id: int # No es necesario en la respuesta si no lo usas
    class Config:
        from_attributes = True

class MarcaBase(BaseModel):
    descripcion: str

class MarcaCreate(MarcaBase):
    empresa_id: int

class Marca(MarcaBase):
    id: int
    # empresa_id: int # No es necesario en la respuesta si no lo usas
    class Config:
        from_attributes = True

# --- Schemas para Usuario ---

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

# --- Schemas finales para Producto ---

class ProductoBase(BaseModel):
    descripcion: str
    stock: Optional[int] = 0
    stock_minimo: Optional[int] = 0
    precio_venta: Optional[float] = 0
    precio_compra: Optional[float] = 0
    categoria_id: int
    marca_id: int
    empresa_id: int

class ProductoCreate(ProductoBase):
    pass

class Producto(ProductoBase):
    id: int
    categoria: Categoria
    marca: Marca

    class Config:
        from_attributes = True